import { appRouter, createTRPCContext } from "@acme/trpc";
import * as trpcNext from '@trpc/server/adapters/next'

export const runtime = "edge";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
const setCorsHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
};

export const OPTIONS = () => {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
};

const handler = trpcNext.createNextApiHandler( {
  router: appRouter,
  createContext: createTRPCContext,
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
})

// const handler = auth(async (req) => {
//   const response = await fetchRequestHandler({
//     endpoint: "/api/trpc",
//     router: appRouter,
//     req,
//     createContext: () =>
//       createTRPCContext({
//         session: req.auth,
//         headers: req.headers,
//       }),
//     onError({ error, path }) {
//       console.error(`>>> tRPC Error on '${path}'`, error);
//     },
//   });

//   setCorsHeaders(response);
//   return response;
// });

export { handler as GET, handler as POST };