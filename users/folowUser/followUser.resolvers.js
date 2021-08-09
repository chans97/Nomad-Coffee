import { protectedResolver } from "../users.utils";
import client from "./../../client";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const usercheck = await client.user.findUnique({
        where: {
          username,
        },
      });
      if (!usercheck) {
        return {
          ok: false,
          error: "no user",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          followings: {
            connect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
