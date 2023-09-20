import {publicProcedure, router} from "./trpc.ts";
import {db} from "./db.ts";
import {z} from 'zod'
import {createHTTPServer} from "@trpc/server/adapters/standalone";

const appRouter= router({
  userList: publicProcedure.query(async()=>{
    const users = await db.user.findMany();
    return users;
  }),
  userById: publicProcedure.input(z.object({id: z.string()})).query(async ({input})=>{
    const {id} = input;
    const user = await db.user.findById(id);
    return user;
  }),
  userCreate: publicProcedure.input(z.object({name: z.string()})).mutation(async ({input})=>{
    const user = await db.user.create(input);
    return user;
  })
})

export type AppRouter = typeof appRouter;


const server = createHTTPServer({
  router:appRouter
})

server.listen(3000)

console.log("server open in http://localhost:3000")
