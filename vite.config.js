import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  mode: "development",
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  server: {
    hmr: false,
  },
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    force: true,
    include: ["react", "react-dom", "styled-components"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});
