// Decouple Database connection

// Import and configure dotenv to load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Import and configure Sequelize
import { Sequelize } from "sequelize";
const sequelize = new Sequelize(process.env.PG_URL);
console.log(sequelize);

export default sequelize;
