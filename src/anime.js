    import gsap from 'gsap';
    import { TweenMax, Power2 } from 'gsap';


    window.TweenMax = gsap.TweenMax;

    export function animateElement(selector) {
        TweenMax.to(selector, 2, { x: 100, ease: Power2.easeInOut });
    }
