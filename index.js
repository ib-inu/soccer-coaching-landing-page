import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

const menu = document.querySelector(".menu");
const menuContent = document.querySelector(".menu-content");
const contactConfirmModal = document.querySelector(".modal-contact-confirm");
const contactModalCloseBtn = document.querySelector("#contact-modal-close-btn");

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const counters = document.querySelectorAll('.counter-num');

    const scroll = new SmoothScroll('.nav-link', {
        speed: 800,
        offset: 0,
        updateURL: false,
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (menu.classList.contains("active")) {
                        menuContent.classList.remove("active");
                        menu.classList.remove("active");
                    }
                    if (link.getAttribute('href').substring(1) === id) {
                        link.classList.add('active');
                    }
                });

                if (entry.target.classList.contains('counter-num')) {
                    updateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
    counters.forEach(counter => {
        observer.observe(counter);
    });

    function updateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 10);
        let count = 0;

        const update = () => {
            if (count < target) {
                counter.innerText = Math.ceil(count);
                count += increment;
                setTimeout(update, 10);
            } else {
                counter.innerText = target;
            }
        };

        update();
    }

    menu.addEventListener('click', () => {
        menu.classList.toggle("active");
        menuContent.classList.toggle("active");
    });

    contactModalCloseBtn.addEventListener("click", () => {
        contactConfirmModal.classList.remove("active");
    });

    const swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    swiper.on('slideChange', function () {
        console.log('Slide index changed to: ', swiper.realIndex);
    });

    const academyLocation = [22.3445, 114.1831];
    const map = L.map('map').setView(academyLocation, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker(academyLocation).addTo(map)
        .bindPopup('Soccer Coaching Academy')
        .openPopup();

    function handleSubmitContact(e) {
        e.preventDefault();

        const form = e.target;
        contactConfirmModal.classList.add("active");
        form.reset();
    }

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', handleSubmitContact);
});
