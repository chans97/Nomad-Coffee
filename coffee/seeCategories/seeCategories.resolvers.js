import client from "../../client";
export default {
  Query: {
    seeCategories: (_, { keyword }) =>
      client.category.findMany({ where: { name: { startsWith: keyword } } }),
  },
};
