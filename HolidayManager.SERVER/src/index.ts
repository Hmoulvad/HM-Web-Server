import { GraphQLServer } from "graphql-yoga";
import { startDB, models } from "./database";
import { default as typeDefs } from "./graphql/typeDefs";
import { default as resolvers } from "./graphql/resolvers";
import { permissions } from "./graphql/helpers/authentication";

const db = startDB({
  user: process.env.MONGO_ATLAS_USER,
  pwd: process.env.MONGO_ATLAS_PW
});

const context = (req : any) => ({
  models,
  db,
  req 
});

const server = new GraphQLServer({ 
  typeDefs, 
  resolvers,
  context,
  middlewares: [permissions],
});

server.start(() => console.log("Server is running on localhost:4000"));