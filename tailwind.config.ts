import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

// フォントサイズのpx->rem計算用関数
const fontSize = Object.fromEntries(
  [...Array(200)].map((_, index) => { 
    const px = index + 10
    return [`${px}ptr`, `${px / 16}rem`]
  })
);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{html,js}", "./src/**/*.{html,js}", "./src/**/**/*.{html,js}",],
  theme: {
    extend: {
      fontSize: fontSize,
      screens: {
        sm: '375px',   // 小型スマホ
        md: '768px',   // タブレット
        lg: '1024px',  // 小型PC
        xl: '1280px',  // 一般的なノートPC
        "2xl": '1440px', // 大型PC
        "3xl": '1680px', // 超大型画面 (カスタム追加)
      },
    },
    container: {
      screens: {
        sm: '375px',   // 小型スマホ (iPhone SEなど)
        md: '768px',   // 中型タブレット (iPadなど)
        lg: '1024px',  // 大型タブレットや小型PC
        xl: '1280px',  // 一般的なノートPC
        "2xl": '1440px', // 大型ノートPCやデスクトップ
        "3xl": '1680px', // 高解像度デスクトップ (必須)
      },
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "0rem",
        xl: "0rem",
        "2xl": "0rem",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        DEFAULT: "#000000",
        900: "#040000"
      },
      white: "#FFFFFF",
      gray: {
        ...colors.gray,
        DEFAULT: "#57595b",
        900: "#3e3f41",
        600: "#58595b",
        550: "#808183", 
        250: "#bbbdbf", 
        200: "#a6a8ab", 
        150: "#d0d2d3", 
        100: "#f1f1f2"
      },
      lightblue: "#2b9bbc",
      ultralightblue: "#28a1d6",
      red: colors.red
    },
    // フォントファミリー各種
    fontFamily: {
      "notosansjp": '"Noto Sans JP", sans-serif',
      "notoserifjp": '"Noto Serif JP", sans-serif',
      "mincho": '"游明朝体", YuMincho, "游明朝", "Yu Mincho", serif',
      "yugothic": '"游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif',
      "arial": '"Arial", メイリオ',
      "kozukagothicpro": ["小塚ゴシック Pro R", "sans-serif"],
      "avenuenextregular": ["AvenueNext Regular", "serif"],
      "avenuenextultralight": ["AvenueNext UltraLight", "serif"]
    }
  },
  plugins: [],
}