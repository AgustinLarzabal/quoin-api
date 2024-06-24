import { DataSource } from "typeorm";
import { Coin } from "../models/coinModel";
import { User } from "../models/userModel";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "coinsdb",
  synchronize: true,
  logging: true,
  entities: [Coin, User],
  subscribers: [],
  migrations: [],
});
