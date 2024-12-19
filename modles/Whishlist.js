import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

// Define Wishlist model schema
const Wishlist = sequelize.define("wishlist", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronize with the database
Wishlist.sync();

export default Wishlist;
