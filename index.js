import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const menu = document.querySelector(".menu");
const menuContent = document.querySelector(".menu-content");


menu.addEventListener('click', () => {
    menu.classList.toggle("active");
    menuContent.classList.toggle("active");

})

const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

swiper.on('slideChange', function () {
    console.log('Slide index changed to: ', swiper.realIndex);
});

