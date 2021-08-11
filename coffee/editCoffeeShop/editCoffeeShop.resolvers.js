import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import fs from "fs";
export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const oldCoffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
          },
        });
        if (!oldCoffeeShop)
          return {
            ok: false,
            error: "No coffeShop",
          };
        if (oldCoffeeShop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "No permission",
          };
        }
        let categoriesObj = [];
        if (categories) {
          categoriesObj = categories.map((category) => ({
            where: { name: category },
            create: { name: category },
          }));
        }
        const newCoffeeShop = await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            ...(categoriesObj.length > 0 && {
              categories: {
                disconnect: oldCoffeeShop.categories,
                connectOrCreate: categoriesObj,
              },
            }),
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
