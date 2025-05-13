import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: async (event) => {
    console.log("Request on:", event.request.url);
  },
});