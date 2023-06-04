import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "./models/Category";
import { Plan } from "./models/Plan";
import { PlanInfo } from "./models/PlanInfo";
import { Transaction } from "./models/Transaction";

const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,
  entities: [Category, Plan, PlanInfo, Transaction],
  synchronize: false,
  logging: true,
});
let connection: DataSource;
declare global {
  var _connection: DataSource;
}
const initialize = async () => {
  //Ideally want to reuse connection with HMR in dev but cant find a way to
  //refresh entities with TypeORM. so just creating a new connection in dev everytime
  if (process.env.NODE_ENV === "development" && connection) {
    console.log("destroying existing connection");
    await connection.destroy();
  }
  connection = await AppDataSource.initialize();
  console.log("connected to DB");
};

const connect = async () => {
  if (!connection) {
    console.log("initializing");
    await initialize();
  }
  return connection;
};

export default connect;
