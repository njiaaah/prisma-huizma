import { prisma } from "./prisma/db";
import { randomUUIDv7 } from "bun";
import { Elysia } from "elysia";
import { jwt } from '@elysia/jwt'
import { cors } from '@elysia/cors'

const app = new Elysia()
  .use(cors())
  .use(jwt({
    secret: process.env.JWT_SECRET!,
    name: 'jwt',
    exp: '7d',
  }))
  .get("/", () => "Hello World")
  .listen(4000)
  .post("/auth/register", async ({ body }) => {
    const registerHash = randomUUIDv7();
    await prisma.user.create({
      data: {
        registerHash: registerHash,
      },
    });
    return registerHash;
  })
  .get("/users", async () => {
    const users = await prisma.user.findMany();
    return users;
  })

// const ALLOWED_ORIGIN = "http://localhost:3000";

// const corsHeaders: Record<string, string> = {
//   "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type",
//   "Access-Control-Allow-Credentials": "true",
// };

// function withCors(res: Response) {
//   const headers = new Headers(res.headers);
//   for (const [k, v] of Object.entries(corsHeaders)) headers.set(k, v);
//   return new Response(res.body, { status: res.status, headers });
// }

// const server = Bun.serve({
//   port: 4000,
//   async fetch(request: Request) {

//     if (request.method === "OPTIONS") {
//       return withCors(new Response(null, { status: 204 }));
//     }

//     const url = new URL(request.url);

//     if(url.pathname === "/users" && request.method === "GET") {
//       const users = await prisma.user.findMany();
//       return Response.json(users);
//     }

//     if (url.pathname === "/auth/register" && request.method === "POST") {
//       const registerHash = randomUUIDv7();
//       // CREATE USER
//       await prisma.user.create({
//         data: {
//           registerHash: registerHash,
//         },
//       });
//       return withCors(Response.json(registerHash));
//   }

//   return withCors(new Response("Hello World"));
//   }
// })