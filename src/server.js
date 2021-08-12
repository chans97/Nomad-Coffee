require("dotenv").config();

import express from "express";
import logger from "morgan";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import { ApolloServer } from "apollo-server-express";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    return { loggedInUser: await getUser(req.headers.token), protectResolver };
  },
  // GraphQLPlayground 를 바로 사용하기 위함

  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`go to http://localhost:${PORT}`);
});
