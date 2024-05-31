import { Sequelize} from "sequelize";

export const sequelize = new Sequelize("ListProducts", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});
