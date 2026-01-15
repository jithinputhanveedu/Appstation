window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};


$('.slider-for-wt').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav-wt',
});
$('.slider-nav-wt').slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    asNavFor: '.slider-for-wt',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
            breakpoint: 1920,
            settings: {
                slidesToShow: 7,
            }
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 6,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 5,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
            }
        }
    ]
});
$('.slider-inner-wt').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    responsive: [{
        breakpoint: 992,
        settings: {
            slidesToShow: 1,
        }
    }, ]
});

$('.sports-for-wt').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.sports-nav-wt'
});
$('.sports-nav-wt').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.sports-for-wt',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
});

$('.gallery-for-wt').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.gallery-nav-wt',
    autoplay: true,
    autoplaySpeed: 2000,
});
$('.gallery-nav-wt').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.gallery-for-wt',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    responsive: [{
        breakpoint: 1920,
        settings: {
            slidesToShow: 6,
        }
    }, {
        breakpoint: 1400,
        settings: {
            slidesToShow: 7,
        }
    }, {
        breakpoint: 576,
        settings: {
            slidesToShow: 5,
        }
    }, ]
});

$(document).ready(function() {
    $(".handburger-menu").click(function() {
        $('body').addClass('menu-open');
    });
    $(".close").click(function() {
        $('body').removeClass('menu-open');
    });
    $(".dark-bg").click(function() {
        $('body').removeClass('menu-open');
    });
});




const DURATION = 3;
let counter = {
    value: 0
};

const tl = gsap.timeline({
    defaults: {
        ease: "linear"
    }
});

/* --------------------
   COUNTER
-------------------- */
tl.to(counter, {
    value: 100,
    duration: DURATION,
    onUpdate: () => {
        document.querySelector(".num").innerText =
            Math.floor(counter.value);
    }
}, 0);

/* --------------------
   SECTION PARALLAX
   (ALL SAME TIME)
-------------------- */
tl.fromTo(".pg-sec-1", {
    x: 0
}, {
    x: 0,
    duration: DURATION
}, 0);
tl.fromTo(".pg-sec-2", {
    x: 0
}, {
    x: 0,
    duration: DURATION
}, 0);
tl.fromTo(".pg-sec-3", {
    x: 0
}, {
    x: 0,
    duration: DURATION
}, 0);

/* --------------------
   BARS
-------------------- */

/* SECTION 1 (single bar) */
tl.to(".pg-sec-1 .bar1 span", {
    width: "100%",
    duration: DURATION
}, 0);

/* SECTION 2 (bar1 ➜ bar2) */
tl.to(".pg-sec-2 .bar1 span", {
    width: "100%",
    duration: DURATION / 2
}, 0);

tl.to(".pg-sec-2 .bar2 span", {
    width: "100%",
    duration: DURATION / 2
}, DURATION / 2);

/* SECTION 3 (bar1 ➜ bar2) */
tl.to(".pg-sec-3 .bar1 span", {
    width: "100%",
    duration: DURATION / 2
}, 0);

tl.to(".pg-sec-3 .bar2 span", {
    width: "100%",
    duration: DURATION / 2,
    onComplete: () => {
        document.body.classList.add("page-loaded");
        document.querySelector("#banner").classList.add("is-active");
        initSectionTriggers();
    }
}, DURATION / 2);




function initSectionTriggers() {

    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(
        "#banner, #whatson, #about, #sports, #latestnes, #spotlight, #gallery"
    );

    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",

            onEnter: () => section.classList.add("is-active"),
            onEnterBack: () => section.classList.add("is-active")
        });
    });
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = gsap.utils.toArray(".section");
let scrollTween;
let currentIndex = 0;

// normalize scroll for touch
let observer = ScrollTrigger.isTouch === 1 ?
    ScrollTrigger.normalizeScroll(true) :
    null;

function goToSection(index) {
    scrollTween = gsap.to(window, {
        scrollTo: {
            y: sections[index],
            autoKill: false
        },
        duration: 1,
        ease: "power2.out",
        onStart: () => observer && observer.disable(),
        onComplete: () => {
            observer && observer.enable();
            scrollTween = null;
        },
        overwrite: true
    });
}

// Wheel control (desktop)
window.addEventListener("wheel", e => {
    if (scrollTween) return;

    if (e.deltaY > 0) {
        currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
        currentIndex = Math.max(currentIndex - 1, 0);
    }

    goToSection(currentIndex);
}, {
    passive: true
});

// Keep index in sync if user scrolls manually
sections.forEach((section, i) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: () => currentIndex = i,
        onEnterBack: () => currentIndex = i
    });
});

// Always start from top
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener("load", () => window.scrollTo(0, 0));