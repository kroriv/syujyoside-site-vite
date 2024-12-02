//==============================================================================================
//
//  Embla
//
//==============================================================================================

const addDotBtnsAndClickHandlers = (
  emblaApi,
  dotsNode,
  onButtonClick
) => {
  let dotNodes = [];
  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('');
    
    const scrollTo = (index) => {
      emblaApi.scrollTo(index)
      if (onButtonClick) onButtonClick(emblaApi)
    };
    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false)
    });
  }
  
  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()
    dotNodes[previous].classList.remove('embla__dot--selected')
    dotNodes[selected].classList.add('embla__dot--selected')
  };
  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive);
  return () => {
    dotsNode.innerHTML = '';
  }
};

const onNavButtonClick = (emblaApi) => {
  const autoplay = emblaApi?.plugins()?.autoplay
  if (!autoplay) return;
  const resetOrStop =
    autoplay.options.stopOnInteraction === false
      ? autoplay.reset
      : autoplay.stop
  resetOrStop();
};

const OPTIONS = { dragFree: false, loop: true };
const emblaNodes = [
  document.querySelector("#consulting .embla"),
  document.querySelector("#wellness .embla"),
  document.querySelector("#movie .embla"),
];

emblaNodes.map((emblaNode, i) => {
  const viewportNode = emblaNode.querySelector(".embla__viewport");
  const dotsNode = emblaNode.querySelector(".embla__dots");
  const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
    emblaApi,
    dotsNode,
    onNavButtonClick
  );
  emblaApi.on("destroy", removeDotBtnsAndClickHandlers);
  
  if (i === 2) {
    const videoIframes = viewportNode.querySelectorAll(".embla__slide iframe");
    function pauseInactiveVideos() {
      const activeIndex = emblaApi.selectedScrollSnap();
      videoIframes.forEach((iframe, i2) => {
        const src = iframe.src;
        // Pause video by resetting src for inactive slides
        if (i2 !== activeIndex) {
          iframe.src = '';
          iframe.src = src; // Reset src to stop playback
        }
      });
    }
    emblaApi.on("select", pauseInactiveVideos);
  }
});


//==============================================================================================
//
//  InViewAnimation
//
//==============================================================================================
// Motion
const { animate, scroll, inView } = Motion;

inView("#concept", () => {
  animate(
    "#concept .intro",
    { x: [-1000, 0] },
    { duration: 1.00, delay: 0.50, easing: "easeIn" }
  );
  animate(
    "#concept .intro",
    { opacity: [0, 1] },
    { duration: 0.50, delay: 1.00 }
  );
});
inView("#service", () => {
  animate(
    "#service .intro",
    { y: [2000, 0], opacity: [0, 1] },
    { duration: 1.00, delay: 0.50, easing: "easeIn" }
  );
});
inView("#service .circle-wrap", () => {
  animate(
    "#service .circle-wrap .circle:first-child",
    { x: [-2000, 0], opacity: [0, 1] },
    { duration: 1.00, delay: 0.50, easing: "easeIn" }
  );
  animate(
    "#service .circle-wrap .circle:last-child",
    { x: [2000, 0], opacity: [0, 1] },
    { duration: 1.00, delay: 0.50, easing: "easeIn" }
  );
});
inView("#service-contents #consulting", () => {
  animate(
    "#service-contents #consulting .board-wrap",
    { x: [-2000, 0] },
    { duration: 1.00, delay: 0.5, easing: "easeIn" }
  );
  animate(
    "#service-contents #consulting .board-wrap",
    { opacity: [0, 1] },
    { duration: 0.50, delay: 1.00 }
  );
  
  animate(
    "#service-contents #consulting .embla-wrap",
    { x: [2000, 0] },
    { duration: 1.00, delay: 0.5, easing: "easeIn" }
  );
  animate(
    "#service-contents #consulting .embla-wrap",
    { opacity: [0, 1] },
    { duration: 0.50, delay: 1.20 }
  );
  
  animate(
    "#service-contents #consulting .liner",
    { scaleY: [0, 1] },
    { duration: 1.00, delay: 0.5, easing: "easeIn" }
  );
});
inView("#service-contents #wellness", () => {
  animate(
    "#service-contents #wellness .board-wrap",
    { x: [2000, 0] },
    { duration: 1.00, delay: 0.5, easing: "easeIn" }
  );
  animate(
    "#service-contents #wellness .board-wrap",
    { opacity: [0, 1] },
    { duration: 0.50, delay: 1.20 }
  );
  
  animate(
    "#service-contents #wellness .embla-wrap",
    { x: [-2000, 0] },
    { duration: 1.00, delay: 0.5, easing: "easeIn" }
  );
  animate(
    "#service-contents #wellness .embla-wrap",
    { opacity: [0, 1] },
    { duration: 0.50, delay: 1.00 }
  );
  
  animate(
    "#service-contents #wellness .liner",
    { scaleY: [0, 1] },
    { duration: 1.00, delay: 0.5, easing: "easeIn" }
  );
});
inView("#movie", () => {
  animate(
    "#movie .embla-wrap",
    { y: [2000, 0] },
    { duration: 1.00, delay: 0.5, easing: "easeIn" }
  );
  animate(
    "#movie .embla-wrap",
    { opacity: [0, 1] },
    { duration: 1.50, delay: 1.25 }
  );
});


//==============================================================================================
//
//  LoadedAnimation
//
//==============================================================================================

const LoadedAnimator = {
  imgSelector: "#hero img",
  animationOptions: {
    keyframes: { opacity: [0, 1] },
    options: { duration: 1.25, delay: 1.0, easing: "easeIn" }
  },
  init() {
    const img = document.querySelector(this.imgSelector);
    if (!img) {
      console.error("画像が見つかりません:", this.imgSelector);
      return;
    }
    if (img.complete) {
      this.animateImage();
    } else {
      img.addEventListener("load", this.animateImage.bind(this));
    }
  },
  animateImage() {
    // LoadingAnimation
    const loading = document.querySelector("#hero .loading");
    animate(
      loading,
      { opacity: [1, 0] },
      { duration: 0.25, delay: 0.5, easing: "easeIn" },
    );
    // SayingAnimation
    const saying = document.querySelector("#hero .saying");
    animate(
      saying,
      { opacity: [0, 1] },
      { duration: 1.25, delay: 0.50, type: "tween" }
    );
    // HeaderAnimation
    const header = document.querySelector("header");
    animate(
      header,
      { y: [-1000, 0], opacity: [0, 1] },
      { duration: 0.25, delay: 0.125, easing: "easeIn" }
    );
    // SelfAnimation
    animate(
      this.imgSelector,
      this.animationOptions.keyframes,
      this.animationOptions.options
    ).then(() => {
      loading.remove();
    });
  }
};

// DOMContentLoaded後に初期化
document.addEventListener("DOMContentLoaded", () => LoadedAnimator.init());