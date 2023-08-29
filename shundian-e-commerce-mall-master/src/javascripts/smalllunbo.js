var mySwiper = new Swiper(".container", {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },

    autoplay: {
        pauseOnMouseEnter: true,
    },
    parallax: true,
    effect: "fade"
});
mySwiper.pagination.bullets.each(function (el) {
    el.onmouseover = function () {
        this.click();
    }
})
var container = document.querySelector(".container");
container.onmouseover = function () {
    mySwiper.autoplay.stop();
}
container.onmouseout = function () {
    mySwiper.autoplay.start();
}