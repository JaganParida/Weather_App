import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Weather_App/", // 🔥 Make sure this matches your GitHub repo name (case-sensitive)
});
