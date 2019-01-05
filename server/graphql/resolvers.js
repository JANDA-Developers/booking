import { bookers } from "./db";

const trans_id = (obj) => {
  if(obj.id == null){
    obj.id = String(obj._id);
  }
  return obj;
};

const resolvers = {
  Query: {
    bookers: async (_, args) => (await bookers.find(args)).map(booker => trans_id(booker)),
    get_booker_by_id: async (_, args) => trans_id(await bookers.findOne(args)),
    get_booker_by_name: async (_, args) => (await bookers.find(args)).map(booker => trans_id(booker))
  },
  Mutation: {
    add_booker: async (_, args) => {
      return trans_id(await bookers(args).save());
    },
    delete_booker: async (_, args) => {
      return await bookers.deleteOne(args);
    }
  }
};

export default resolvers;
