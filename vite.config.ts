import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  ssr: {
    noExternal: ["three", "@react-three/fiber", "@react-three/drei"],
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    netlify(),
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],
});
