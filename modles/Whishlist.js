// Schema with database interaction

import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Wishlist = sequelize.define("wishlist", {
  /*id: {
    type: DataTypes.BIGINT,
  },
  title: {
    type: DataTypes.STRING,
  },*/
  owner: {
    type: DataTypes.STRING,
  },
});

Wishlist.sync();

export default Wishlist;
