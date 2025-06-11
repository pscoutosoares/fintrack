"use strict";

import fs from "fs";
import path from "path";
import database from "infra/database";
import process from "process";
import Sequelize from "sequelize";

async function handleMigrationsConnection() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not defined.");
  }
  const basename = path.basename(__filename);
  const sequelize = await database.getNewClient();
  const db: Record<string, any> = {};

  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".ts" &&
        file.indexOf(".test.ts") === -1
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes,
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}

export default handleMigrationsConnection;
