// let's create Sticky Navigation Bar on Scroll
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 0);  //here some problem is occured but why
});
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
menu.oneclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
};

const sr = ScrollReveal({
    distance: '45px',
    duration: 2000,
    reset: true
})
sr.reveal('.home-text', { delay: 150, origin: 'left' })
sr.reveal('.home-img', { delay: 150, origin: 'right' })

sr.reveal('.sub-service,.about,.portfolio,.service,.cta,.contact', { delay: 150, origin: 'bottom' })
// completed


// Checkout the complete javascript 