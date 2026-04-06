import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 35,
    speed:1200,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    breakpoints: {

        0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },

        576: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },

        768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },

        992: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },

        1200: {
            slidesPerView: 5,
            slidesPerGroup: 5,
        },
    },
});