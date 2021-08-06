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
`;
