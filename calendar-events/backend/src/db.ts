import knex from "knex";

const dotenv = require("dotenv");
const knexConfig = require("../knexfile");

dotenv.config();
const config = knexConfig[process.env.ENV];
const connection = knex(config);

export default connection;
