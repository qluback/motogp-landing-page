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
    markers: true,
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
    ".intro-background-video"
  ) as HTMLVideoElement;

  if (video) {
    // Check if metadata is already loaded
    ScrollTrigger.create({
      trigger: ".intro",
      pin: ".intro-background",
      start: "top top",
      endTrigger: "section.intro",
      end: "bottom bottom",
      scrub: 0.1,
      onUpdate: (self) => {
        const progress = self.progress;

        video.currentTime = progress * 15;
      },
    });
  }

  gsap.to(".intro-background-blur", {
    scrollTrigger: {
      trigger: ".intro",
      // start: () => `${window.innerHeight * 2}px top`,
      // end: () => `${window.innerHeight * 3}px`,
      start: "top top",
      endTrigger: ".intro",
      end: "top+=500px top",
      scrub: true,
    },
    opacity: 0,
    backdropFilter: "blur(0px)",
    webkitBackdropFilter: "blur(0px)",
  });

  gsap.to(".intro-background-fadeLeft", {
    scrollTrigger: {
      trigger: ".intro-content",
      start: "top bottom", // start when .intro-content hits bottom of viewport
      endTrigger: ".intro-content",
      end: "top top", // end when it reaches top of viewport
      scrub: true,
    },
    backgroundSize: "200% 100%", // animate width from 0% → 100%
    ease: "power2.in",
  });

  gsap.to(".intro-content-right", {
    scrollTrigger: {
      trigger: ".intro-content-right",
      // start: () => `${window.innerHeight * 2}px top`,
      // end: () => `${window.innerHeight * 3}px`,
      start: "top bottom",
      endTrigger: ".intro-content-right",
      end: "bottom top",
      scrub: true,
    },
    paddingTop: "5rem",
  });

  const quoteSection = document.querySelector(".quote") as HTMLElement;

  gsap.to(quoteSection, {
    scrollTrigger: {
      trigger: ".quote",
      start: () => `top top`, // 20% of viewport scrolled
      end: () => `${window.innerHeight * 2}px`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        quoteSection.style.setProperty("--progress", String(progress * 10));

        if (progress < 0.25) {
          const fadeIn = progress / 0.25; // 0 → 1
          // quoteSection.style.opacity = String(fadeIn);
          quoteSection.style.setProperty("--progress", String(fadeIn));
        }
        // Full opacity (0.25 → 0.75)
        else if (progress < 0.75) {
          // quoteSection.style.opacity = "1";
          quoteSection.style.setProperty("--progress", "1");
        }
        // Fade out (0.75 → 1)
        else {
          const fadeOut = (1 - progress) / 0.25; // 1 → 0
          // quoteSection.style.opacity = String(fadeOut);
          quoteSection.style.setProperty("--progress", String(fadeOut));
        }
        // quoteSection.style.opacity = String(progress * 10);
      },
    },
    // opacity: 1,
    // onComplete: () => {
    //   document.querySelector(".hero-title")?.style.setProperty("background-color", "black");
    // }
  });

  gsap.to(".quote-banner-img", {
    scrollTrigger: {
      trigger: ".quote",
      start: "top top",
      end: () => `${window.innerHeight * 4}px`,
      scrub: true,
    },
    scale: 1,
  });

  gsap.to(".quote-banner-text", {
    scrollTrigger: {
      trigger: ".quote",
      start: () => `top+=${window.innerHeight * 0.5}px top`,
      end: () => `${window.innerHeight}px`,
      scrub: true,
    },
    transform: "translateY(-2rem)",
    opacity: 1,
  });

  gsap.to(".drivers-list", {
    scrollTrigger: {
      trigger: ".drivers",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      markers: true
    },
    // opacity: 0
    left: 0
  });

  // const driverSection = document.querySelector(".drivers") as HTMLElement;
  // const driverRows = document.querySelectorAll(".drivers-list-row");

  // driverRows.forEach((row, index) => {
  //   const zValue = -index * 200;

  //   gsap.set(row, {
  //     zIndex: driverRows.length - index,
  //     xPercent: -50,
  //     yPercent: -50,
  //     z: -200,
  //     // opacity: 0
  //   });

  //   // gsap.to(row, {
  //   //   opacity: 1,
  //   //   scrollTrigger: {
  //   //     trigger: ".drivers",
  //   //     start: () => `top+=${index * driverSection.offsetHeight / driverRows.length} top`,
  //   //     end: () => `top+=${(index + 1) * driverSection.offsetHeight / driverRows.length} top`,
  //   //     scrub: true,
  //   //   }
  //   // });

  //   let rowTimeline = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".drivers",
  //       // start: () => `top top`,
  //       start: () =>
  //         `top+=${
  //           (index * driverSection.offsetHeight) / driverRows.length
  //         } top`,
  //       end: () =>
  //         `top+=${
  //           ((index + 1) * driverSection.offsetHeight) / driverRows.length
  //         } top`,
  //       scrub: true,
  //     },
  //   });
  //   rowTimeline.to(row, {
  //     // opacity: 0,
  //     z: 400,
  //   });
  //   rowTimeline.to(
  //     row,
  //     {
  //       opacity: 0,
  //       // z: 0,
  //     },
  //     "-=0.4"
  //   );
  //   rowTimeline.to(
  //     row,
  //     {
  //       display: "none"
  //       // z: 0,
  //     },
  //     "-=0.4"
  //   );
  // });

  // gsap.to(".drivers-list", {
  //   scrollTrigger: {
  //     trigger: ".drivers",
  //     start: "top top",
  //     end: "bottom bottom",
  //     scrub: true,
  //   },
  //   backgroundSize: "100%",
  // });

  // const videoOutro = document.querySelector(
  //   ".outro-background-video"
  // ) as HTMLVideoElement;

  // if (videoOutro) {
  //   // Check if metadata is already loaded
  //   ScrollTrigger.create({
  //     trigger: ".outro",
  //     pin: ".outro-background",
  //     start: "top top",
  //     endTrigger: "section.outro",
  //     end: "bottom bottom",
  //     scrub: 0.1,
  //     onUpdate: (self) => {
  //       const progress = self.progress;
  //       videoOutro.currentTime = progress * 11;
  //     },
  //   });
  // }

  // // gsap.to(".outro-background-blur", {
  // //   scrollTrigger: {
  // //     trigger: ".outro",
  // //     // start: () => `${window.innerHeight * 2}px top`,
  // //     // end: () => `${window.innerHeight * 3}px`,
  // //     start: "top top",
  // //     endTrigger: ".outro",
  // //     end: "top+=500px top",
  // //     scrub: true,
  // //   },
  // //   opacity: 0,
  // //   backdropFilter: "blur(0px)",
  // //   webkitBackdropFilter: "blur(0px)",
  // // });

  // // gsap.to(".outro-background-fadeLeft", {
  // //   scrollTrigger: {
  // //     trigger: ".outro-content",
  // //     start: "top bottom", // start when .outro-content hits bottom of viewport
  // //     endTrigger: ".outro-content",
  // //     end: "top top", // end when it reaches top of viewport
  // //     scrub: true,
  // //   },
  // //   backgroundSize: "200% 100%", // animate width from 0% → 100%
  // //   ease: "power2.in",
  // // });

  // gsap.to(".outro-content", {
  //   scrollTrigger: {
  //     trigger: ".outro",
  //     // start: () => `${window.innerHeight * 2}px top`,
  //     // end: () => `${window.innerHeight * 3}px`,
  //     start: () => `top+=${window.innerHeight * 9}px top`,
  //     // endTrigger: ".outro-content-right",
  //     // end: "bottom top",
  //     scrub: true,
  //     markers: true
  //   },
  //   display: "grid",
  // });
});
