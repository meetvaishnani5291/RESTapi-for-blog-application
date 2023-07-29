import { exec } from "child_process";
import mongoose from "mongoose";
import path from "path";
import { promisify } from "util";
import config from "../config/envConfig";
import chalk from "chalk";

const promisifiedExec = promisify(exec);

async function isCollectionEmpty(db: any, collectionName: string): Promise<boolean> {
  const collection = db.collection(collectionName);
  const count = await collection.countDocuments();
  return count === 0;
}

async function setupDB(): Promise<void> {
  try {
    const db = mongoose.connection; // Use your existing Mongoose connection

    const targetCollectionName = "blogs"; // Replace with the actual collection name
    const collectionIsEmpty = await isCollectionEmpty(db, targetCollectionName);

    if (collectionIsEmpty) {
      const importFilePath = path.join(__dirname,"../", "seeders", "blogs.json");

      // Prepare the mongoimport command
      const mongoimportCommand = `mongoimport --host ${config.DATABASE_HOST} --port ${config.DATABASE_PORT} --db ${config.DATABASE_NAME} --collection ${targetCollectionName} --file ${importFilePath}`;

      // Execute the mongoimport command using the promisifiedExec function
      const { stdout, stderr } = await promisifiedExec(mongoimportCommand);

      console.log(chalk.bgGreen.bold("Data imported successfully!"));
      console.log(stdout);
    } else {
      console.log(chalk.bgGreen.bold(`Collection '${targetCollectionName}' is not empty. Skipping import.`));
    }
  } catch (error) {
    console.error(chalk.bgRed("Error importing data:"));
    console.log(error);
  }
}

export default setupDB;
