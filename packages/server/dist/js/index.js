import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { createContext } from "./context.js";
import { appRouter } from "./root.js";
const server = fastify({
    maxParamLength: 5000,
});
(async () => {
    try {
        await server.register(cors, {
            origin: true,
            credentials: true,
        });
        await server.register(fastifyCookie);
        server.register(fastifyTRPCPlugin, {
            prefix: "/trpc",
            trpcOptions: { router: appRouter, createContext },
        });
        await server.listen({ port: 3001, host: "0.0.0.0" });
        console.log("🚀 tRPC server listening on port 3001");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
})();
