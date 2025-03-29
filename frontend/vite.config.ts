import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",  // Ensures correct paths
  build: {
    outDir: "dist", // Vercel expects the built files in "dist"
    emptyOutDir: true
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
