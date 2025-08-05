import "./styles/index.scss";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP ScrollTrigger integration
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.to(".hero-banner-img", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
  scale: 1,
});

gsap.to(".hero-title-mask", {
  scrollTrigger: {
    trigger: ".hero",
    pin: ".hero-title",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
  scale: 1,
});

gsap.to(".hero-title-bg", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top -50%", // 20% of viewport scrolled
    end: "bottom bottom",
    scrub: true,
  },
  opacity: 1,
});

// Animate scale — start immediately
gsap.to(".hero-title-bg", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top", // starts as soon as .hero hits top of viewport
    end: "bottom bottom",
    scrub: true,
  },
  scale: 1,
});

// ScrollTrigger.create({
//   trigger: "section.arguments",
//   pin: ".arguments-background",
//   start: "top top",
//   endTrigger: "section.case",
//   end: "top bottom",
// });
