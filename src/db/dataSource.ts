import { DataSource } from "typeorm";
import { Coin } from "../models/coinModel";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "coinsdb",
  synchronize: true,
  logging: true,
  entities: [Coin],
  subscribers: [],
  migrations: [],
});
