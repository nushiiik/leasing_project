(function() {
    const INITIAL_NUMBER_SLIDE = 1;

    class Slider {
        constructor(selector, settings = {}) {
            this.slider = document.querySelector(selector);
            this.current = INITIAL_NUMBER_SLIDE;
            this.slideCount = this.slider.children.length;
            this.settings = settings;
        }

        next() {
            if (this.current < this.slideCount) {
                this.current++;
            } else {
                this.current = 1;
            }
            this.translate();
        }

        prev() {
            if (this.current > 1) {
                this.current--;
            } else {
                this.current = this.slideCount;
            }
            this.translate();
        }

        translate() {
            this.slider.style.transform = `translateX(${(this.current - 1) * (-200)}%)`;
        }

        setEventListener() {
            const btnSlideRight = document.querySelector('.slide-arrow--right');
            const btnSlideLeft = document.querySelector('.slide-arrow--left');
            const dots = document.querySelectorAll(".paginator__item");

            let activeElementDot = 0;

            btnSlideRight.addEventListener('click', () => {
                this.next();

                dots[activeElementDot].classList.remove("paginator__item--active");

                if (activeElementDot + 1 === dots.length) {
                    activeElementDot = 0;
                } else {
                    activeElementDot++;
                }
                dots[activeElementDot].classList.add("paginator__item--active");
            });
            btnSlideLeft.addEventListener('click', () => {
                this.prev();

                dots[activeElementDot].classList.remove("paginator__item--active");
                if (activeElementDot - 1 < 0) {
                    activeElementDot = dots.length - 1;
                } else {
                    activeElementDot--;
                }
                dots[activeElementDot].classList.add("paginator__item--active");
            });
        }

        init() {
            if (this.settings.transition) {
                this.slider.style.transition = `${this.settings.transition}ms`;
            }

            this.setEventListener();
        }

    }

    const slider = new Slider('#slider', {
        transition: 1000,
    });

    slider.init();

    console.log(slider);
})()
