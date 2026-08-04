import { defineConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export default defineConfig({
  site: "https://constitutional-capitalism-board.netlify.app",
  trailingSlash: "always",
  vite: {
    resolve: {
      alias: {
        "@data": path.join(root, "data"),
        "@content": path.join(root, "content"),
      },
    },
    cacheDir: path.join(root, ".local/vite/build-board"),
    server: {
      fs: {
        allow: [root],
      },
    },
  },

  build: {
    format: "directory",
  },
});
