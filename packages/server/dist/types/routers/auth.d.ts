import type { Context } from "../context.js";
export declare const authRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: Context;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    register: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email: string;
            password: string;
        };
        output: {
            success: boolean;
            userId: string;
            token: string;
        };
    }>;
    login: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email: string;
            password: string;
        };
        output: {
            success: boolean;
            userId: string;
            token: string;
        };
    }>;
    me: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            user: import("../context.js").StandardUserContext;
        };
    }>;
    logout: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            success: boolean;
        };
    }>;
}>>;
