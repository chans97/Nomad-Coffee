import client from "./../client";
export default {
  User: {
    totalFollowings: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),

    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return loggedInUser.id === id;
    },

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: { id: loggedInUser.id, followings: { some: { id } } },
      });

      return Boolean(exists);
    },
  },
};
