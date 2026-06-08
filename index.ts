import { prisma } from "./prisma/db";

const server = Bun.serve({
  port: 4000,
  async fetch(request) {

    const url = new URL(request.url);

    if(url.pathname === "/users" && request.method === "GET") {
      const users = await prisma.user.findMany();
      return Response.json(users);
    }

    return new Response("Hello World");
  }
})