import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import mkcert from "vite-plugin-mkcert";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), pluginRewriteAll()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  build: {
    commonjsOptions: {
      defaultIsModuleExports(id) {
        try {
          const module = require(id);
          if (module?.default) {
            return false;
          }
          return "auto";
        } catch (error) {
          return "auto";
        }
      },
    },
  },
});

// function mkcert(): import("vite").PluginOption {
//   throw new Error("Function not implemented.");
// }

// function pluginRewriteAll(): import("vite").PluginOption {
//   throw new Error("Function not implemented.");
// }
