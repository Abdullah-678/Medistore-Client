import {createEnv} from "@t3-oss/env-nextjs"
import * as z from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    BACKEND_URL: z.url(),
    FRONTEND_URL: z.url(),
    API_URL:z.url(),
    AUTH_URL:z.url()
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  // client: {
  //   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  // },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL:process.env.API_URL,
    AUTH_URL:process.env.AUTH_URL
  },
});