import "reflect-metadata";
import * as mongoose from "mongoose";

let connection: mongoose.Mongoose;

const initialize = async () => {
  console.log(process.env.ATLAS_URL);
  connection = await mongoose.connect(process.env.ATLAS_URI);
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
