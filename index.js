const menu = document.querySelector(".menu");
const menuContent = document.querySelector(".menu-content");
const contactConfirmModal = document.querySelector(".modal-contact-confirm");
const contactModalCloseBtn = document.querySelector("#contact-modal-close-btn");
const page = document.querySelector(".page");
const pageLoader = document.querySelector(".loader-div");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const counters = document.querySelectorAll(".counter-num");
const imgTargets = document.querySelectorAll("img[data-src]");

const swiper = new Swiper(".swiper", {
    init: false,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

swiper.init();

document.addEventListener("DOMContentLoaded", () => {
    initializePageLoader();
    initializeIntersectionObserver();
    initializeMenuToggle();
    initializeContactForm();
    initializeMap();
    initializeLazyLoading();
});

function initializePageLoader() {
    page.style.display = "block";
    pageLoader.style.display = "none";
}

function initializeIntersectionObserver() {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
    counters.forEach(counter => observer.observe(counter));
}

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href").substring(1) === id);
        });

        if (entry.target.classList.contains("counter-num")) {
            updateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}

function updateCounter(counter) {
    const target = Number(counter.getAttribute("data-target"));
    let count = 0;
    const increment = target / 200;

    function update() {
        count = Math.min(count + increment, target);
        counter.innerText = Math.ceil(count);
        if (count < target) setTimeout(update, 10);
    }
    update();
}

function initializeMenuToggle() {
    menu.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuContent.classList.toggle("active");
    });
    navLinks.forEach(nav =>
        nav.addEventListener("click", () => {
            if (menu.classList.contains("active") &&
                menuContent.classList.contains("active")) {
                menu.classList.remove("active");
                menuContent.classList.remove("active");
            }
        })
    )

}

function initializeContactForm() {
    const form = document.getElementById("contact-form");
    const modal = document.querySelector(".modal-contact-confirm");
    const closeBtn = document.querySelector(".btn-close");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        modal.classList.add("active");
        form.reset();
    });

    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
}


function initializeMap() {
    const location = [22.3445, 114.1831];
    const map = L.map("map").setView(location, 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    }).addTo(map);

    L.marker(location).addTo(map)
        .bindPopup("Soccer Coaching Academy")
        .openPopup();
}

function initializeLazyLoading() {
    const imgObserver = new IntersectionObserver(loadImg, {
        root: null,
        threshold: 0,
        rootMargin: "400px"
    });
    imgTargets.forEach(img => imgObserver.observe(img));
}

function loadImg(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
        entry.target.removeAttribute("data-src");
        observer.unobserve(entry.target);
    });
}
