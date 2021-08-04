import client from "./../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (_, { username, email, name, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
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
        return { ok: true };
      } catch (e) {
        return { ok: false, error: `${e}` };
      }
    },
  },
};
