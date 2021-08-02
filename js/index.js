function init() {
    $(function () {
        $("#skillportfolio").load("skillportfolio.html");
    });
    $(function () {
        $("#colorfultickets").load("colorfultickets.html");
    });
}

document.getElementById("mission").style.display = "none";
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-pane fade");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        x[i].className = x[i].className.replace(" show active", "");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).className += " show active";
}

function setVideoHeight() {
    const videoRatio = 1920 / 1080;
    const minVideoWidth = 400 * videoRatio;
    let secWidth = 0,
        secHeight = 0;

    secWidth = videoSec.width();
    secHeight = videoSec.height();

    secHeight = secWidth / 2.13;

    if (secHeight > 600) {
        secHeight = 600;
    } else if (secHeight < 400) {
        secHeight = 400;
    }

    if (secWidth > minVideoWidth) {
        $("video").width(secWidth);
    } else {
        $("video").width(minVideoWidth);
    }

    videoSec.height(secHeight);
}

// Parallax function
// https://codepen.io/roborich/pen/wpAsm
var background_image_parallax = function ($object, multiplier) {
    multiplier = typeof multiplier !== "undefined" ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    var $doc = $(document);
    $object.css({ "background-attatchment": "fixed" });
    $(window).scroll(function () {
        var from_top = $doc.scrollTop(),
            bg_css = "center " + multiplier * from_top + "px";
        $object.css({ "background-position": bg_css });
    });
};

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $(".scrolltop:hidden")
            .stop(true, true)
            .fadeIn();
    } else {
        $(".scrolltop")
            .stop(true, true)
            .fadeOut();
    }

    // Make sticky header
    if ($(this).scrollTop() > 158) {
        $(".tm-nav-section").addClass("sticky");
    } else {
        $(".tm-nav-section").removeClass("sticky");
    }
});

let videoSec;

$(function () {
    const mainNav = $("#tmMainNav");
    mainNav.singlePageNav({
        filter: ":not(.external)",
        offset: $(".tm-nav-section").outerHeight(),
        updateHash: true,
        beforeStart: function () {
            mainNav.removeClass("show");
        }
    });

    videoSec = $("#tmVideoSection");

    // Adjust height of video when window is resized
    $(window).resize(function () {
        setVideoHeight();
    });

    setVideoHeight();

    $(window).on("load scroll resize", function () {
        var scrolled = $(this).scrollTop();
        var vidHeight = $("#hero-vid").height();
        var offset = vidHeight * 0.6;
        var scrollSpeed = 0.25;
        var windowWidth = window.innerWidth;

        if (windowWidth < 768) {
            scrollSpeed = 0.1;
            offset = vidHeight * 0.5;
        }

        $("#hero-vid").css(
            "transform",
            "translate3d(-50%, " + -(offset + scrolled * scrollSpeed) + "px, 0)"
        ); // parallax (25% scroll rate)
    });

    // Parallax image background
    background_image_parallax($(".tm-parallax"), 0.4);

    // Back to top
    $(".scroll").click(function () {
        $("html,body").animate(
            { scrollTop: $("#home").offset().top },
            "1000"
        );
        return false;
    });
});