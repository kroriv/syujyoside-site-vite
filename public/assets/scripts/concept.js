//==============================================================================================
//
//  InViewAnimation
//
//==============================================================================================
// Motion
const { animate, scroll, inView } = Motion;

inView("#concept", () => {
  animate(
    "#concept .h2-v1",
    { x: [-1000, 0], opacity: [0, 1] },
    { duration: 0.30, delay: 0.15, easing: "easeIn" }
  );
});


//==============================================================================================
//
//  LoadedAnimator
//
//==============================================================================================

const LoadedAnimator = {
  imgSelector: "#concept img",
  animationOptions: {
    keyframes: { opacity: [0, 1] },
    options: { duration: 0.60, delay: 0.3, easing: "easeIn" }
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
    const loading = document.querySelector("#concept .loading");
    animate(
      loading,
      { opacity: [1, 0] },
      { duration: 0.25, delay: 0.5, easing: "easeIn" },
    );
    // SelfAnimation
    animate(
      this.imgSelector,
      this.animationOptions.keyframes,
      this.animationOptions.options
    ).then(() => {
      // Remove Loading
      loading.remove();
      // ProfileAnimation
      const profile = document.querySelector("#concept .profile");
      animate(
        profile,
        { y:[2000, 0], opacity: [0, 1] },
        { duration: 0.25, delay: 0.15, easing: "easeIn" },
      );
    });
  }
};

// DOMContentLoaded後に初期化
document.addEventListener("DOMContentLoaded", () => LoadedAnimator.init());