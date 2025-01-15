const menu = document.querySelector(".menu");
const menuContent = document.querySelector(".menu-content");

menu.addEventListener('click', () => {
    menu.classList.toggle("active");
    menuContent.classList.toggle("active");

})
