import { GraphQLServer } from "graphql-yoga";
import { startDB, models } from "./database";
import resolvers from "./graphql/resolvers";

const db = startDB({
  user: process.env.MONGO_ATLAS_USER,
  pwd: process.env.MONGO_ATLAS_PW
});
const context = {
  models,
  db
}

const server = new GraphQLServer({ 
  typeDefs: `${__dirname}/graphql/schema.graphql`, 
  resolvers,
  context
});

server.start(() => console.log("Server is running on localhost:4000"));