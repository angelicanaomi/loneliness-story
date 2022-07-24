let data;
let isTouch = false
let firstPosition = 0
let lastPosition = 0
let curId = 0
let index = []
let dataActive;
let isFullscreen = false

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

    $('.book-music').click(function() {
        if($('#book-music')[0].paused) {
            $('#book-music')[0].play()
            return
        }
        $('#book-music')[0].muted = !$('#book-music')[0].muted
        $('#book-music')[0].muted ? $(this).find('img').attr('src', 'img/buttons/Muted.png') : $(this).find('img').attr('src', 'img/buttons/Music.png')
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
            $('.book-outer')[0].requestFullscreen()
            screen.orientation.lock('landscape-primary')
        })
    }

    $('.book-fullscreen').click(function() {
        isFullscreen ? document.exitFullscreen() : $('.book-outer')[0].requestFullscreen()
    })

    $('.book-outer').on('fullscreenchange', function() {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            isFullscreen = false
            $('.book-fullscreen img').attr('src', 'img/buttons/Fullscreen.png')
        } else {
            isFullscreen = true
            $('.book-fullscreen img').attr('src', 'img/buttons/Windowed.png')
        }
    })

    $('.book-image').on('load', function() {
        const obj = dataActive[curId]

        setSlide(obj)
        $('.book-loading').removeClass('show')
    })
})



function updateSlide() {
    const obj = dataActive[curId]

    if(obj.clickable) {
        $('.book-bottom').hide()
    } else {
        $('.book-bottom').show()
    }

    $('.book-loading').addClass('show')
    $('.book-image').attr('src', obj.img)
}

function setSlide(obj) {
    $('.book-text-wrapper').html('')
    $(obj.dataText).each(function(i, v) {
        if(v.goto == "first") {
            $('.book-text-wrapper').append(`<span onclick="skipPage()" style="left: ${v.x}; top: ${v.y}; max-width: ${v.width};"><img src="${v.text}" alt=" "></span>`)
            return
        } else if(v.goto == "home") {
            $('.book-text-wrapper').append(`<span onclick="home()" style="left: ${v.x}; top: ${v.y}; max-width: ${v.width};"><img src="${v.text}" alt=" "></span>`)
            return
        }

        if(v.action) {
            const arr = [curId, i]
            $('.book-text-wrapper').append(`<span onclick="setClick(${arr})" style="left: ${v.x}; top: ${v.y}; max-width: ${v.width};"><img src="${v.text}" alt=" "></span>`)
        } else {
            $('.book-text-wrapper').append(`<span style="left: ${v.x}; top: ${v.y}; max-width: ${v.width};"><img src="${v.text}" alt=" "></span>`)
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

function setClick(current, idx, reset=false) {
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

function skipPage() {
    dataActive = data[0].dataText[1].action
    index = [[0,1]]
    curId = 14
    
    updateSlide()
}