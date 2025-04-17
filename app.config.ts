import { defineConfig } from "@solidjs/start/config";
// plugins
import tailwindcss from "@tailwindcss/vite";
import devtools from 'solid-devtools/vite'
import compression from "vite-plugin-compression";
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      imagetools(),
      devtools({
        autoname: true,
      }),
      // Simple gzip compression for production builds
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        filter: /\.(js|css|html|svg|)$/i,
        deleteOriginFile: false
      })
    ],
    ssr: { 
      external: ["drizzle-orm"],
      noExternal: ['@kobalte/core']
    },
    server: {
      allowedHosts: [
        "localhost",
        "ten.ngrok.dev",
      ],
    },
    build: {
      cssCodeSplit: true,
      reportCompressedSize: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.debug']
        }
      }
    }
  },
  middleware: "./src/middleware.ts",
});

