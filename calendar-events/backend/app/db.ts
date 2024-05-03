import knex from "knex";
import "dotenv/config";
import knexConfig from "../knexfile.js";

const config = knexConfig[process.env.ENV];
const connection = knex(config);

export default connection;
