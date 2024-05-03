import * as userService from "../../services/users/users.js";

export const fetchAllUsers = async (req, res, next) => {
  return userService
    .fetchAllUsers()
    .then((data) => res.send(data))
    .catch((err) => res.status(500))
    .finally(() => next());
};
