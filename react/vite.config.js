import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false, // only for the demo, not to "cheat" with minificated code
    // when comparing perf with vanilla js code
  },
});
