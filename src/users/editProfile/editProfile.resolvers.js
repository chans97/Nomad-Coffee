import fs from "fs";
import bcrypt from "bcrypt";
import client from "./../../client";
import { protectedResolver } from "./../users.utils";

const editProfileResolver = async (
  _,
  { name, username, email, password: newPassword, avatarURL },
  { loggedInUser }
) => {
  let newAvatarUrl = null;
  if (avatarURL) {
    const { filename, createReadStream } = await avatarURL;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = fs.createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    newAvatarUrl = `http://localhost:4000/static/${newFilename}`;
  }
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const ok = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      name,
      username,
      email,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarURL && { avatarURL: newAvatarUrl }),
    },
  });
  if (ok) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(editProfileResolver),
  },
};
