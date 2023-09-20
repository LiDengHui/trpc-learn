
type User = {id:string, name: string};

const users: User[] = [];


export const db= {
  user: {
    findMany: async ()=> users,

    findById: async(id: string)=> users.find(item=>item.id===id),

    create: async(data: {name: string, }) => {
      const user = {id: `${users.length}`, ...data};
      users.push(user);
      return user;
    }
  }
}
