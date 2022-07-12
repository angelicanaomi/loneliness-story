const data = [
    {
        img: 'img/1.jpg',
        dataText: [
            {
                text: 'Hi! Perkenalkan, kami Kaka si Boneka Monyet, Popo si Boneka Beruang dan Puma si Kucing Hitam.',
                x: 24,
                y: 64,
                width: '80%',
                color: 'black'
            }
        ]
    },
    {
        img: 'img/2.jpg',
        dataText: [
            {
                text: 'Kami bertiga tinggal di rumah Nanda, sahabat kami. Sekarang, Nanda duduk di kelas 4 SD',
                x: 24,
                y: 64,
                width: '80%',
                color: 'black'
            }
        ]
    },
    {
        img: 'img/3.jpg',
        dataText: [
            {
                text: 'Nanda sangat menyayangi kami. Kami pun sangat menyayangi Nanda. Ssst.. Kami punya kekuatan untuk melihat dan merasakan apa yang Nanda rasakan',
                x: 24,
                y: 64,
                width: '80%',
                color: 'black'
            }
        ]
    }
]



let currentId = 0
let isTouch = false
let firstPosition = 0
let lastPosition = 0

$(document).ready(function() {
    updateSlide(currentId)

    $('.book-next').click(function() {
        if(currentId < data.length - 1) {
            currentId++
            updateSlide(currentId)
        }
    })

    $('.book-back').click(function() {
        if(currentId > 0) {
            currentId--
            updateSlide(currentId)
        }
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
            if(currentId < data.length - 1) {
                currentId++
                updateSlide(currentId)
            }
        } else if(lastPosition > firstPosition && lastPosition - firstPosition > 64) {
            if(currentId > 0) {
                currentId--
                updateSlide(currentId)
            }
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

function updateSlide(id) {
    const obj = data[id]
    $('.book-image').attr('src', obj.img)
    $('.book-text-wrapper').html('')
    $(obj.dataText).each(function(i, v) {
        $('.book-text-wrapper').append(`<span style="left: ${v.x}px; top: ${v.y}px; width: ${v.width}; color: ${v.color};">${v.text}</span>`)
    })
    $('.book-progress span').css('--progress', (((currentId + 1) / data.length) * 100)+'%')
}