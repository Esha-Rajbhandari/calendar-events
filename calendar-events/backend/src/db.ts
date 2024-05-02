import knex from "knex";
import "dotenv/config";
import knexConfig from "../knexfile";

const config = knexConfig[process.env.ENV];
const connection = knex(config);

export default connection;
