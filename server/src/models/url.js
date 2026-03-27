import {DataTypes} from "sequelize"
import sequelize from "../config/db.js";

const Url = sequelize.define(
  "Url",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "original_url", // ✅ FIX
    },
    shortCode: {
      type: DataTypes.STRING,
      unique: true,
      field: "short_code", // ✅ FIX
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastIp: {
      type: DataTypes.STRING,
      field: "last_ip", // ✅ FIX
    },
  },
  {
    tableName: "urls",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default Url;