
$(function () {

    // added navbar on scroll to the bottom change the background color
    var header = $('.header'),
        scrollOffset = $(window).scrollTop();
    chekScroll(scrollOffset);

    $(window).on("scroll", function () {
        scrollOffset = $(this).scrollTop();
        chekScroll(scrollOffset);
    });

    function chekScroll(scrollOffset) {
        if (scrollOffset > 50) {
            header.addClass("fixed-header")
        } else {
            header.removeClass("fixed-header")
        }

    }
});

$j(function () {
    // Data scroll and selected active nav-link
    $j('[data-scroll]').on("click", function (event) {
        event.preventDefault();

        var elementClass = $(this).data('scroll');
        blockOffset = $(elementClass).offset().top;
        $(".nav a").removeClass('active');
        $(this).addClass('active');
        $('.nav-toggle').removeClass('active');
        $('.nav').removeClass('active');
        $j('html, body').animate({
            scrollTop: blockOffset
        }, 500);
    });

    // Burger menu
    $('.nav-toggle').on('click', function (event) {

        event.preventDefault();
        var nav = $('.nav'),
            scrollOffset = $(window).scrollTop(),
            header = $('.header');

        $(this).toggleClass('active');
        nav.toggleClass('active');

        if (nav.hasClass('active')) {
            header.addClass('fixed-header');
            console.log(scrollOffset + " + 1");

        }
        else if (!nav.hasClass('active') && scrollOffset == 0) {
            header.removeClass('fixed-header');
            console.log(scrollOffset + "+ 2");
        }

    });

});

window.onload = function () {
    $(".slider").slick({
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    var percentTime;
    var tick;
    var time = 1;
    var progressBarIndex = 0;

    $('.progressBarContainer .progressBar').each(function (index) {
        var progress = "<div class='inProgress inProgress" + index + "'></div>";
        $(this).html(progress);
    });

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        tick = setInterval(interval, 10);
    }

    function interval() {
        if (($('.slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
            progressBarIndex = $('.slider .slick-track div[aria-hidden="false"]').data("slickIndex");
            startProgressbar();
        } else {
            percentTime += 1 / (time + 5);
            $('.inProgress' + progressBarIndex).css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $('.single-item').slick('slickNext');
                progressBarIndex++;
                if (progressBarIndex > 2) {
                    progressBarIndex = 0;
                }
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $('.inProgress').css({
            width: 0 + '%'
        });
        clearInterval(tick);
    }
    startProgressbar();
    // End ticking machine

    $('.progressBarContainer div').click(function () {
        clearInterval(tick);
        var goToThisIndex = $(this).find("span").data("slickIndex");
        $('.single-item').slick('slickGoTo', goToThisIndex, false);
        startProgressbar();
    });
}