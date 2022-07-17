let data;
let isTouch = false
let firstPosition = 0
let lastPosition = 0
let curId = 0
let index = []
let dataActive;

$(document).ready(async function() {
    await fetch('data.json')
    .then(resp=> resp.json())
    .then(jsonData=> {
        data = jsonData
        dataActive = data;
    })

    updateSlide()

    $('.book-next').click(function() {
        controlSlide(true)
    })

    $('.book-back').click(function() {
        controlSlide(false)
    })

    $('.book-image').on('touchstart', function(e) {
        isTouch = true
        const touch = e.touches[0]
        firstPosition = touch.pageX
    })

    $('.book-image').on('touchmove', function(e) {
        lastPosition = e.touches[0].pageX
    })

    $('.book-image').on('touchend', function() {
        if(lastPosition < firstPosition && firstPosition - lastPosition > 64) {
            controlSlide(true)
        } else if(lastPosition > firstPosition && lastPosition - firstPosition > 64) {
            controlSlide(false)
        }

        isTouch = false
    })

    if($(window).width() < 576) {
        $('.btn-fullscreen').click(function() {
            $(this)[0].webkitRequestFullscreen()
            screen.orientation.lock('landscape-primary')
        })
    }
})



function updateSlide() {
    const obj = dataActive[curId]

    if(obj.clickable) {
        $('.book-bottom').hide()
    } else {
        $('.book-bottom').show()
    }

    $('.book-image').attr('src', obj.img)
    $('.book-text-wrapper').html('')
    $(obj.dataText).each(function(i, v) {
        if(v.action) {
            const arr = [curId, i]
            $('.book-text-wrapper').append(`<span onclick="setClick(${arr})" style="left: ${v.x}; top: ${v.y}; max-width: ${v.width}; color: ${v.color};">${v.text}</span>`)
        } else {
            $('.book-text-wrapper').append(`<span style="left: ${v.x}; top: ${v.y}; max-width: ${v.width}; color: ${v.color}; ${v.bg ? 'border-radius: .25rem; padding: .25rem .5rem; background-color: '+v.bg+';' : ''}">${v.text}</span>`)
        }

        if(!obj.clickable) {
            $('.book-progress span').css('--progress', (((curId + 1) / dataActive.length) * 100)+'%')
        }
    })
}

function controlSlide(add) {
    if(add && curId < dataActive.length - 1) {
        curId++
        updateSlide()
    } else if(!add && curId > 0) {
        curId--
        updateSlide()
    } else if(!add && curId == 0) {
        curId = index[index.length-1][0]

        if(index.length > 0) {
            for(let i=0; i<index.length; i++) {
                if(i==0) {
                    dataActive = data
                } else {
                    dataActive = dataActive[index[i-1][0]].dataText[index[i-1][1]].action
                }
            }

            updateSlide()
        }

        index = index.slice(0, -1)
    }
}

function setClick(current, idx) {
    dataActive = dataActive[current].dataText[idx].action
    index.push([current, idx])
    curId = 0

    updateSlide()
}

function home() {
    dataActive = data
    index = []
    curId = 0

    updateSlide()
}