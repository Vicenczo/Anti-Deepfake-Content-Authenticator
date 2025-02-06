import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Dostupno na svim mrežnim sučeljima
    port: 8080, // Port na kojem će raditi server
  },
  plugins: [
    react(), // React plugin za Vite
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias za src folder
    },
  },
}));