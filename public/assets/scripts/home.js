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
  const autoplay = emblaApi?.plugins()?.autoplay;
  if (!autoplay) return;
  const resetOrStop =
    autoplay.options.stopOnInteraction === false
      ? autoplay.reset
      : autoplay.stop
  resetOrStop();
};


const emblaNodes = [
  document.querySelector("#hero .embla"),
  document.querySelector("#movie .embla"),
  document.querySelector("#consulting .embla"),
  document.querySelector("#wellness .embla"),
].filter(node => node);

emblaNodes.map((emblaNode, i) => {
  const viewportNode = emblaNode.querySelector(".embla__viewport");
  const dotsNode = emblaNode.querySelector(".embla__dots");
  
  
  if (i === 0) {
    const OPTIONS = { dragFree: false, loop: true, duration: 100 };
    const PLUGINS = [
      EmblaCarouselAutoplay({ playOnInit: true, delay: 8000, stopOnInteraction: false }), 
      EmblaCarouselFade({ duration: 4000 })
    ];
    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, PLUGINS);
    emblaApi.on("init", () => {
      const { autoplay } = emblaApi.plugins();
      autoplay.play(); // 手動で再生開始
      console.log(emblaApi.plugins());
    });
  }
  
  if (i === 1) {
    const OPTIONS = { dragFree: false, loop: true };
    const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
    const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
      emblaApi,
      dotsNode,
      onNavButtonClick
    );
    emblaApi.on("destroy", removeDotBtnsAndClickHandlers);
    const videoIframes = viewportNode.querySelectorAll(".embla__slide iframe");
    function pauseInactiveVideos() {
      const activeIndex = emblaApi.selectedScrollSnap();
      videoIframes.forEach((iframe, i2) => {
        const src = iframe.src;
        // Pause video by resetting src for inactive slides
        if (i2 !== activeIndex) {
          iframe.src = "";
          iframe.src = src; // Reset src to stop playback
        }
      });
    }
    emblaApi.on("select", pauseInactiveVideos);
  }
  
  const OPTIONS = { dragFree: false, loop: true };
  const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
    emblaApi,
    dotsNode,
    onNavButtonClick
  );
  emblaApi.on("destroy", removeDotBtnsAndClickHandlers);
  
});


//==============================================================================================
//
//  InViewAnimation
//
//==============================================================================================
// Motion
const { animate, scroll, inView } = Motion;

const header = document.querySelector("header");
const logo = header.querySelector("h1 img");
scroll(
  (offset, info) => {
    logo.classList.remove("invert");
    if (info.y.targetOffset <= info.y.current) {
      logo.classList.add("invert");
    }
  },
  { target: document.getElementById("concept") }  
)

inView("#concept", () => {
  animate(
    "#concept .intro",
    { x: [-300, 0] },
    { 
      duration: 0.40, 
      delay: 0.45, 
      easing: [0.05, 0.95, 0.3, 0.06, 0.56, 1] // 極端に後半で遅くなるカーブ
    },
  );
  animate(
    "#concept .intro",
    { opacity: [0, 1] },
    { duration: 0.80, delay: 0.50 },
  );
}, { margin: "0px 0px -400px 0px" });
inView("#service", () => {
  animate(
    "#service .intro",
    { y: [300, 0] },
    { 
      duration: 0.40, 
      delay: 0.45, 
      easing: [0.05, 0.95, 0.3, 0.06, 0.56, 1] // 極端に後半で遅くなるカーブ
    }
  );
  animate(
    "#service .intro",
    { opacity: [0, 1] },
    { duration: 1.00, delay: 0.35, easing: [0.05, 0.95, 0.3, 0.06, 0.56, 1] }
  );
}, { margin: "0px 0px -400px 0px" });
inView("#service .circle-wrap", () => {
  // 左円
  animate(
    "#service .circle-wrap .circle:first-child",
    { x: [-300, 0] },
    {
      duration: 0.4, // アニメーション全体を少し長く
      delay: 0.25,
      easing: [0.05, 0.95, 0.3, 0.06, 1] // 極端に後半で遅くなるカーブ
    }
  );
  animate(
    "#service .circle-wrap .circle:first-child",
    { opacity: [0, 1] },
    { duration: 0.40, delay: 0.50, easing: "easeOut" }
  );
  
  // 右円
  animate(
    "#service .circle-wrap .circle:last-child",
    { x: [300, 0] },
    {
      duration: 0.4, // アニメーション全体を少し長く
      delay: 0.25,
      easing: [0.05, 0.95, 0.3, 0.06, 1] // 極端に後半で遅くなるカーブ
    }
  );
  animate(
    "#service .circle-wrap .circle:last-child",
    { opacity: [0, 1] },
    { duration: 0.40, delay: 0.50, easing: "easeOut" }
  );
}, { margin: "0px 0px -200px 0px" });

inView("#service-contents #consulting", () => {
  animate(
    "#service-contents #consulting .board-wrap",
    { x: [-300, 0] },
    { 
      duration: 0.25, 
      delay: 0.5, 
      easing: [0.05, 0.95, 0.3, 0.06, 1] // 極端に後半で遅くなるカーブ
    }
  );
  animate(
    "#service-contents #consulting .board-wrap",
    { opacity: [0, 1] },
    { duration: 0.50, delay: 0.50, easing: "easeOut" }
  );
  animate(
    "#service-contents #consulting .embla-wrap",
    { x: [300, 0] },
    { 
      duration: 0.25, 
      delay: 0.5, 
      easing: [0.05, 0.95, 0.3, 0.06, 1] // 極端に後半で遅くなるカーブ
    }
  );
  animate(
    "#service-contents #consulting .embla-wrap",
    { opacity: [0, 1] },
    { duration: 0.40, delay: 0.50, easing: "easeOut" }
  );
  animate(
    "#service-contents #consulting .liner",
    { scaleY: [0, 1] },
    { duration: 0.80, delay: 0.5, easing: "easeOut" }
  );
}, { margin: "0px 0px -200px 0px" });

inView("#service-contents #wellness", () => {
  animate(
    "#service-contents #wellness .board-wrap",
    { x: [300, 0] },
    { 
      duration: 0.25, 
      delay: 0.5, 
      easing: [0.05, 0.95, 0.3, 0.06, 1] // 極端に後半で遅くなるカーブ
    }
  );
  animate(
    "#service-contents #wellness .board-wrap",
    { opacity: [0, 1] },
    { duration: 0.50, delay: 0.50, easing: "easeOut" }
  );
  animate(
    "#service-contents #wellness .embla-wrap",
    { x: [-300, 0] },
    { 
      duration: 0.25, 
      delay: 0.5, 
      easing: [0.05, 0.95, 0.3, 0.06, 1] // 極端に後半で遅くなるカーブ
    }
  );
  animate(
    "#service-contents #wellness .embla-wrap",
    { opacity: [0, 1] },
    { duration: 0.40, delay: 0.50, easing: "easeOut" }
  );
  animate(
    "#service-contents #wellness .liner",
    { scaleY: [0, 1] },
    { duration: 0.80, delay: 0.5, easing: "easeOut" }
  );
}, { margin: "0px 0px -400px 0px" });
inView("#movie", () => {
  animate(
    "#movie .embla-wrap",
    { y: [600, 0] },
    { duration: 1.00, delay: 0.5, easing: [0.05, 0.95, 0.3, 0.06, 1] }
  );
  animate(
    "#movie .embla-wrap",
    { opacity: [0, 1] },
    { duration: 1.00, delay: 1.25 }
  );
}, { margin: "0px 0px -400px 0px" });

inView("#home-column", () => {
  animate(
    "#home-column #posts",
    { y: [300, 0] },
    { duration: 0.50, delay: 0.5, easing: [0.05, 0.95, 0.3, 0.06, 1] }
  );
  animate(
    "#home-column #posts",
    { opacity: [0, 1] },
    { duration: 0.40, delay: 0.80 }
  );
}, { margin: "0px 0px -400px 0px" });


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