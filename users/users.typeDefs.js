import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
    createAt: String!
    updatedAt: String!
  }
  type Isok {
    ok: Boolean
    error: String
  }
  type Query {
    showUser(username: String!): User
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      password: String!
    ): Isok
  }
`;
