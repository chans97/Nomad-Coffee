require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  // GraphQLPlayground 를 바로 사용하기 위함
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }) => {
  console.log(`go to ${url}`);
});
