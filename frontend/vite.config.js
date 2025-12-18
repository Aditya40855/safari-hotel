import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Built-in Node tool

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This tells Vite "@" = the "src" folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
});