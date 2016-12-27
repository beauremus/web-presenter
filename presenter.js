/**
 * Framework supporting presentation controls
 * @author Beau Harrison <beauharrison@gmail.com>
 */

document.addEventListener('DOMContentLoaded', presenter);

/**
 * Initializer for presenation controls
 */
function presenter() {

    /** SLIDE CONTROLLER */

    /**
     * Key codes
     * 13 - Enter
     * 32 - Spacebar
     * 33 - Page up
     * 34 - Page down
     * 37 - Left arrow
     * 38 - Up arrow
     * 39 - Right arrow
     * 40 - Down arrow
     */

    /**
     * Key codes associated with advancing the slide
     * @type {Array}
     */
    const NEXT_KEYCODES = [13,32,34,39,40];

    /**
     * Key codes associated with retreating the slide
     * @type {Array}
     */
    const PREV_KEYCODES = [33,37,38];

    window.addEventListener('click', function (e) {
        nextSlide();
    });

    window.addEventListener('wheel', function (e) {
        if (e.deltaY > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    });

    window.addEventListener('keyup', function (e) {
        if (NEXT_KEYCODES.includes(e.keyCode)) {
            nextSlide();
        } else if (PREV_KEYCODES.includes(e.keyCode)) {
            prevSlide();
        }
    });

    /** DOM HANDLER */

    const SLIDES = document.querySelectorAll('.slide');

    let currentSlide = 0;

    // begin at 1 making first slide visible
    for (var i = 1; i < SLIDES.length; i++) {
        SLIDES[i].classList.toggle('hidden');
    }

    function nextSlide() {
        if (currentSlide < SLIDES.length-1) {
            SLIDES[currentSlide].classList.toggle('hidden');
            currentSlide++;
            SLIDES[currentSlide].classList.toggle('hidden');
            const slideChange = new CustomEvent('slideChange',{detail: {current:currentSlide}});
            document.dispatchEvent(slideChange);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            SLIDES[currentSlide].classList.toggle('hidden');
            currentSlide--;
            SLIDES[currentSlide].classList.toggle('hidden');
            const slideChange = new CustomEvent('slideChange',{detail: {current:currentSlide}});
            document.dispatchEvent(slideChange);
        }
    }
}
