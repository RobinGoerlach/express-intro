import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Database connection setup
const sequelize = new Sequelize(process.env.PG_URL);

export default sequelize;
