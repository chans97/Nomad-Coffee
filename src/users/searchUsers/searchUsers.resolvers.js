import client from "./../../client";
export default {
  Query: {
    searchUsers: (_, { keywords, lastId }) =>
      client.user.findMany({
        where: {
          username: {
            startsWith: keywords.toLowerCase(),
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
