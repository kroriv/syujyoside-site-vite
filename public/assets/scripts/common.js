//==============================================================================================
//
//  SmoothScroll
//
//==============================================================================================

// スムーズスクロール関数
function smoothScrollTo(targetElement, duration = 1000) {
  const start = window.pageYOffset; // 現在のスクロール位置
  const target = targetElement.offsetTop; // 目標位置
  const distance = target - start; // 移動距離
  const startTime = performance.now(); // 開始時刻

  function scrollAnimation(currentTime) {
    const elapsedTime = currentTime - startTime; // 経過時間
    const progress = Math.min(elapsedTime / duration, 1); // 進行度（0～1）
    const ease = easeInOutQuad(progress); // イージング関数適用

    window.scrollTo(0, start + distance * ease); // スクロール位置を更新

    if (progress < 1) {
      requestAnimationFrame(scrollAnimation); // アニメーションを続ける
    }
  }

  // イージング関数（加速→減速）
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  requestAnimationFrame(scrollAnimation);
}

// ページロード後のハッシュスクロール無効化＆スムーズスクロール
document.addEventListener("DOMContentLoaded", () => {
  const anchor = window.location.hash; // URLのハッシュ部分を取得
  if (anchor) {
    const targetElement = document.querySelector(anchor);
    if (targetElement) {
      // 一瞬のジャンプを防ぐためにスクロール位置をリセット
      window.scrollTo(0, 0);
      // 50ms後にスムーズスクロールを実行
      setTimeout(() => smoothScrollTo(targetElement, 1000), 50);
    }
    // フォーカス移動による一瞬のジャンプを防ぐ
    history.pushState(null, null, `#${targetId}`);
  }
});

// ページ内部のスムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    // デフォルトの動作を無効化
    e.preventDefault();
    
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // 50ms後にスムーズスクロールを実行
      setTimeout(() => smoothScrollTo(targetElement, 1000), 50);
    }
    // フォーカス移動による一瞬のジャンプを防ぐ
    history.pushState(null, null, `#${targetId}`);
  });
});


//==============================================================================================
//
//  DrawerMenu
//
//==============================================================================================

// Nodes
const html = document.documentElement;
const body = document.body;
const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const navLinks = document.querySelectorAll(".navs a");

// スクロール位置を保存する変数
let scrollPosition = 0;

hamburger.addEventListener("click", () => {
  if (hamburger.classList.contains("open")) {
    // ドロワーを閉じる処理
    hamburger.classList.remove("open");
    drawer.classList.remove("open");
    body.style.position = "";
    body.style.top = "";
    body.style.overflow = "";
    html.style.overflow = "";
    window.scrollTo(0, scrollPosition); // 元の位置にスクロール復元
  } else {
    // ドロワーを開く処理
    scrollPosition = window.pageYOffset;
    hamburger.classList.add("open");
    drawer.classList.add("open");
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
  }
});

// リンクがクリックされた時にドロワーを閉じる
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    drawer.classList.remove("open");
    body.style.position = "";
    body.style.top = "";
    body.style.overflow = "";
    html.style.overflow = "";
  });
});