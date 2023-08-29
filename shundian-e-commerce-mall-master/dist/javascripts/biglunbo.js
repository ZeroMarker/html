var mySwiper = new Swiper(".container1", {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
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
var container1 = document.querySelector(".container1");
container1.onmouseover = function () {
    mySwiper.autoplay.stop();
}
container1.onmouseout = function () {
    mySwiper.autoplay.start();
}