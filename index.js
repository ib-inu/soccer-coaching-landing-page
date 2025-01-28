import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const menu = document.querySelector(".menu");
const menuContent = document.querySelector(".menu-content");
const contactConfirmModal = document.querySelector(".modal-contact-confirm");
const contactModalCloseBtn = document.querySelector("#contact-modal-close-btn");

menu.addEventListener('click', () => {
    menu.classList.toggle("active");
    menuContent.classList.toggle("active");

})

contactModalCloseBtn.addEventListener("click", () => {
    contactConfirmModal.classList.remove("active");
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



document.addEventListener('DOMContentLoaded', function () {
    const academyLocation = [22.3445, 114.1831];

    const map = L.map('map').setView(academyLocation, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker(academyLocation).addTo(map)
        .bindPopup('Soccer Coaching Academy')
        .openPopup();
});



function handleSubmitContact(e) {
    e.preventDefault();

    const form = e.target;
    // const formData = new FormData(form);
    contactConfirmModal.classList.add("active");
    form.reset();
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', handleSubmitContact);
});