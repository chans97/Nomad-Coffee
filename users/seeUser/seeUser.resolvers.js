import client from "../../client";
export default {
  Query: {
    seeFollowings: async (_, { username, lastId }) => {
      const checkUser = client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!checkUser) {
        return {
          ok: false,
          error: "No user",
        };
      }
      const followings = client.user
        .findUnique({
          where: { username },
        })
        .followings({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        followings,
      };
    },
    seeFollowers: async (_, { username, lastId }) => {
      const checkUser = client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!checkUser) {
        return {
          ok: false,
          error: "No user",
        };
      }
      const followers = client.user
        .findUnique({
          where: { username },
        })
        .followers({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};
