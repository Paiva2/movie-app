import { fileURLToPath, URL } from "node:url"

import { defineConfig, Plugin } from "vite"
import react from "@vitejs/plugin-react"

const fullReloadAlways: Plugin = {
  name: "full-reload",
  handleHotUpdate({ server }) {
    server.ws.send({ type: "full-reload" })
    return []
  },
}

export default defineConfig({
  plugins: [react(), fullReloadAlways],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "esnext",
  },
  server: {
    port: 5174,
  },
})
