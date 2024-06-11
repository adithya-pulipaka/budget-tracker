// import mongoose from "mongoose";
// declare global {
//   var mongoose: any; // This must be a `var` and not a `let / const`
// }

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default dbConnect;

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
