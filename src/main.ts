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

document.addEventListener("DOMContentLoaded", function () {
  gsap.to(".hero-banner-img", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: () => `${window.innerHeight}px`,
      scrub: true,
    },
    scale: 1,
  });

  ScrollTrigger.create({
    trigger: ".hero",
    pin: ".hero-title",
    start: "top top",
    end: "bottom bottom",
    scrub: true, // optional: scrub helps keep things in sync
    // onUpdate: (self) => {
    //   console.log(self.progress);
    // }
  });
  // gsap.to(".hero-title", {
  //   scrollTrigger: {
  //     trigger: ".hero",
  //     start: "top top",
  //     end: "+=700vh",
  //     scrub: true,
  //   },
  //   backgroundColor: "black",
  // });

  gsap.to(".hero-title-mask", {
    scrollTrigger: {
      trigger: ".hero",
      start: () => `${window.innerHeight * 0.1}px top`,
      end: () => `${window.innerHeight}px`,
      scrub: true,
    },
    scale: 1,
  });

  // Animate scale — start immediately
  gsap.to(".hero-title-bg", {
    scrollTrigger: {
      trigger: ".hero",
      start: () => `${window.innerHeight * 0.1}px top`, // starts as soon as .hero hits top of viewport
      end: () => `${window.innerHeight}px`,
      scrub: true,
    },
    scale: 1,
  });

  gsap.to(".hero-title-bg", {
    scrollTrigger: {
      trigger: ".hero",
      start: () => `${window.innerHeight * 0.2}px top`, // 20% of viewport scrolled
      end: () => `${window.innerHeight}px`,
      scrub: true,
      onUpdate: (self) => {
        const heroTitle = document.querySelector(".hero-title") as HTMLElement;
        // console.log(self.progress);
        if (self.progress > 0.8) {
          heroTitle.style.setProperty("background-color", "black");
        } else {
          heroTitle.style.removeProperty("background-color");
        }
      },
    },
    opacity: 1,
    // onComplete: () => {
    //   document.querySelector(".hero-title")?.style.setProperty("background-color", "black");
    // }
  });

  gsap.to(".hero-title-inner", {
    scrollTrigger: {
      trigger: ".hero",
      start: () => `${window.innerHeight}px top`,
      end: () => `${window.innerHeight * 2}px`,
      scrub: true,
    },
    scale: 0.9,
  });

  const heroTitleText = document.querySelector(
    ".hero-title-text"
  ) as HTMLElement;

  if (heroTitleText) {
    let heroTitleTextTimeline = gsap.timeline();
    heroTitleTextTimeline.to(heroTitleText, {
      scrollTrigger: {
        trigger: ".hero",
        start: () => `${window.innerHeight}px top`, // starts as soon as .hero hits top of viewport
        end: () => `${window.innerHeight * 2}px`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          heroTitleText.style.setProperty("--progress", progress * 50 + "%");
          heroTitleText.style.opacity = String(progress * 1);
        },
      },
    });
  }

  gsap.to(".hero-title-bgFadeOut", {
    scrollTrigger: {
      trigger: ".hero",
      start: () => `${window.innerHeight * 2}px top`,
      end: () => `${window.innerHeight * 3}px`,
      scrub: true,
    },
    top: "-100vh",
  });

  const video = document.querySelector(
    ".calendar-background-video"
  ) as HTMLVideoElement;

  if (video) {
    // Check if metadata is already loaded
    ScrollTrigger.create({
      trigger: ".calendar",
      pin: ".calendar-background",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
      markers: true,
      onUpdate: (self) => {
        video.currentTime = 97+self.progress * 5;
    }
  });
  }
  // if (video) {
  //   video.pause(); // ✅ No TypeScript error now

  //   video.addEventListener("loadedmetadata", () => {
  //     console.log("Metadata loaded");
  //     const duration = video.duration;

  //     ScrollTrigger.create({
  //       trigger: ".calendar",
  //       pin: ".calendar-background",
  //       start: "top top",
  //       end: "bottom bottom",
  //       scrub: true,
  //       markers: true,
  //       onUpdate: (self) => {
  //         console.log(self.progress);
  //         video.currentTime = self.progress * duration;
  //       },
  //     });
  //   });
  // }
});
