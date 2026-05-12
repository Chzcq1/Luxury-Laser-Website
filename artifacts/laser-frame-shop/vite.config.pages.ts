import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// วิธีแก้ base path:
// - ถ้า repo ชื่อ "ruaylanlan" → base: "/ruaylanlan/"
// - ถ้าใช้ custom domain หรือ username.github.io → base: "/"
const GITHUB_REPO_NAME = process.env.GITHUB_REPOSITORY
  ? "/" + process.env.GITHUB_REPOSITORY.split("/")[1] + "/"
  : "/";

export default defineConfig({
  base: GITHUB_REPO_NAME,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist-pages"),
    emptyOutDir: true,
  },
});
