import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {AppRouter} from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:3000`
    })
  ]
});
let userlist = await trpc.userList.query();
console.log(userlist)
await trpc.userCreate.mutate({name: 'shchinraja'});
const user = await trpc.userById.query({id:"1"});

console.log(user);

userlist = await trpc.userList.query();
console.log(userlist)
