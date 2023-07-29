import mongoose from "mongoose";
import chalk from "chalk";
require("dotenv").config();

import app from "./express/app";
import config from "./config/envConfig";
import setupDB from "./utils/setupDB";


const DATABASE_CONNECTION_STRING = `mongodb://${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}`;

async function assertDatabaseConnectionOk() {
  console.log(chalk.bgCyan.bold(`Checking database connection...`));
  try {
    mongoose.set("debug", true);
    console.log(DATABASE_CONNECTION_STRING);
    await mongoose.connect(DATABASE_CONNECTION_STRING);
    console.log(chalk.bgGreen.bold("Database connection OK!"));
    setupDB();
  } catch (error) {
    console.log(chalk.bgRed("Unable to connect to the database:"));
    console.log(chalk.bgRed((error as Error).message));
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
  console.log(chalk.bgCyan.bold(`Starting Express server on port ${config.PORT}...`));
  app.listen(config.PORT, () => {
    console.log(chalk.bgGreen.bold(`Express server started on port ${config.PORT}`));
  });
}
init();
