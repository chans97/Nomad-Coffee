import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
  }
  type SeeFollowingsResult {
    ok: Boolean!
    error: String
    followings: [User]
  }
  type Query {
    seeFollowers(username: String!, lastId: Int): SeeFollowersResult
    seeFollowings(username: String!, lastId: Int): SeeFollowingsResult
  }
`;
