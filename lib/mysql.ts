import "reflect-metadata";
import * as mysql from "mysql2/promise";

let connection: mysql.Connection;

const initialize = async () => {
  connection = await mysql.createConnection(process.env.DATABASE_URL);
  return connection;
};

const connect = async () => {
  if (!connection) {
    console.log("initializing");
    await initialize();
  }
  return connection;
};

export default connect;
