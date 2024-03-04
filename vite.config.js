import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
  build: {
    // Set up a custom build configuration
    rollupOptions: {
      // Output a global variable containing environment variables
      output: {
        manualChunks: {
          env: ["dotenv"],
        },
      },
    },
  },
});
