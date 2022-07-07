const data = [
    {
        img: 'img/1.jpg',
        dataText: [
            {
                text: 'Hi! Perkenalkan, kami Kaka si Boneka Monyet, Popo si Boneka Beruang dan Puma si Kucing Hitam.',
                x: 200,
                y: 24,
                width: '60%',
                color: 'black'
            }
        ]
    },
    {
        img: 'img/2.jpg',
        dataText: [
            {
                text: 'Kami bertiga tinggal di rumah Nanda, sahabat kami. Sekarang, Nanda duduk di kelas 4 SD',
                x: 200,
                y: 24,
                width: '60%',
                color: 'black'
            }
        ]
    },
    {
        img: 'img/3.jpg',
        dataText: [
            {
                text: 'Nanda sangat menyayangi kami. Kami pun sangat menyayangi Nanda. Ssst.. Kami punya kekuatan untuk melihat dan merasakan apa yang Nanda rasakan',
                x: 200,
                y: 24,
                width: '60%',
                color: 'black'
            }
        ]
    }
]



let currentId = 0

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