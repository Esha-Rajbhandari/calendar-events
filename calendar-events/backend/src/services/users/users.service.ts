import * as User from "../../models/Users";

export const addUser = async (user) => {
  try {
    const userByEmail = await User.getUser(user.email);

    if (!!userByEmail.id) {
      return [];
    }

    const data = await User.addUser(user);

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};
