import * as User from "../../models/Users.js";

export const addUser = async (user) => {
  try {
    const userByEmail = await User.getUser(user.email);

    if (!!userByEmail) {
      return [];
    }

    const data = await User.addUser(user);

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};

export const fetchAllUsers = async () => {
  try {
    const data = await User.fetchAllUsers();

    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};
