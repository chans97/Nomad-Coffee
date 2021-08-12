import { protectedResolver } from "../../users/users.utils";
import client from "./../../client";
import fs from "fs";
export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        let categoriesObj = [];
        if (categories) {
          categoriesObj = categories.map((category) => ({
            where: { name: category },
            create: { name: category },
          }));
        }
        const newCoffeeShop = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(categoriesObj.length > 0 && {
              categories: {
                connectOrCreate: categoriesObj,
              },
            }),
          },
        });

        if (photos) {
          photos.map(async (photo) => {
            const { filename, createReadStream } = await photo;
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = fs.createWriteStream(
              process.cwd() + "/uploads/" + newFilename
            );
            readStream.pipe(writeStream);
            const url = `http://localhost:4000/static/${newFilename}`;
            const newPhoto = await client.coffeeShopPhoto.create({
              data: {
                url,
                CoffeeShop: {
                  connect: {
                    id: newCoffeeShop.id,
                  },
                },
              },
            });
            return newPhoto.id;
          });
        }

        return {
          ok: true,
        };
      }
    ),
  },
};
