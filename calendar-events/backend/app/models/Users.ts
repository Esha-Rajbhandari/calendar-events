import connection from "../db.js";

const TABLE_NAME = "users";

export async function addUser(user) {
  const data = await connection(TABLE_NAME).insert(user).returning("*");

  return data;
}

export async function getUser(email: string) {
  const [data] = await connection
    .select("*")
    .from(TABLE_NAME)
    .where("email", email);

  return data;
}

export async function fetchAllUsers() {
  const data = await connection.select("*").from(TABLE_NAME);

  return data;
}
