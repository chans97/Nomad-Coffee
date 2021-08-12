import client from "../../client";
export default {
  Query: {
    seeCoffeeShops: (_, { keyword, lastId }) =>
      client.coffeeShop.findMany({
        where: {
          name: {
            startsWith: keyword,
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
