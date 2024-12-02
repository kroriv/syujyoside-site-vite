import { resolve } from "path";
import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";
import { findAllFiles } from "./custom.build.functions";

// ROOT
const root = resolve(__dirname, "./src");

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  /*
  const rollupOptionsInput = await Promise.all([await findAllFiles("./src", ".html")]).then((values) => {
    return ...values;
  });
  */
  const rollupOptionsInput = await findAllFiles("./src", ".html");
  return {
    root: root,
    base: "/",
    publicDir: resolve(__dirname, "public"),
    assetsInclude: [resolve(__dirname, "public")],
    plugins: [],
    css: {
      devSourcemap: true,
    }, 
    build: {
      sourcemap: true,
      outDir: resolve(__dirname, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        input: rollupOptionsInput,
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split(".")[1];
            // 画像ファイルの振り分け
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
              return `assets/images/[hash].[ext]`;
            }
            // ビルド時のCSS名を明記してコントロールする
            if(extType === "css") {
              return `assets/styles/[hash].css`;
            }
            return `assets/${extType}/[name][extname]`;
          },
          entryFileNames: `assets/js/[name]-[hash].js`,
          //chunkFileNames: `assets/js/[name]-[hash].js`,
          manualChunks: () => "[hash].js",
        }
      },
    },
  };
});