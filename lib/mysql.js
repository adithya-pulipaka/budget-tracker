import * as mysql from "mysql2/promise";

let conn = global.conn || createConnection;

if (process.env.NODE_ENV === "development" && !global.conn) {
  global.conn = conn;
}

async function createConnection() {
  console.log("first");
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  return connection;
}

export default conn;
