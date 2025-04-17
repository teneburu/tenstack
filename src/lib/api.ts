import {
  createTRPCClient,
  httpBatchLink,
  loggerLink,
} from '@trpc/client';
import type { AppRouter } from "../trpc/root";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  // replace example.com with your actual production url
  if (process.env.NODE_ENV === "production") return "https://example.com";
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

// create the client, export it
export const api = createTRPCClient<AppRouter>({
  links: [
      // will print out helpful logs when using client
      loggerLink(),
      // identifies what url will handle trpc requests
      httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })
  ],
});