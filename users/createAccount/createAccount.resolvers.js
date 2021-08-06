import client from "../../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (_, { name, username, email, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await client.user.create({
          data: {
            name,
            username,
            email,
            password: hashedPassword,
          },
        });
        if (newuser) {
          return {
            ok: true,
            error: null,
          };
        } else {
          return {
            ok: false,
            error: "retry",
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: `${e}`,
        };
      }
    },
  },
};
