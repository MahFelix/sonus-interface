import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Aumenta o limite para 1000 kB
    rollupOptions: { // Correção: "rollupOptions" com "r" minúsculo
      external: ['jspdf'], // Adicione 'jspdf' aqui
    },
  },
});