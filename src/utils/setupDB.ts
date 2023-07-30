import { exec  } from "child_process";
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

async function importDataIfCollectionEmpty(collectionName: string): Promise<void> {
  try {
    const db = mongoose.connection; 

    const collectionIsEmpty = await isCollectionEmpty(db, collectionName);

    if (collectionIsEmpty) {
      const importFilePath = path.join(__dirname, "../", "../", "seeders", `${collectionName}.json`);

      // Prepare the mongoimport command
      const mongoimportCommand = `mongoimport  --jsonArray --host ${config.DATABASE_HOST} --port ${config.DATABASE_PORT} --db ${config.DATABASE_NAME} --collection ${collectionName} --file ${importFilePath}`;

      // Execute the mongoimport command using the promisifiedExec function
      const { stdout } = await promisifiedExec(mongoimportCommand);

      console.log(chalk.bgGreen.bold(`Data imported successfully from ${collectionName}!`));
      console.log(stdout);
    } else {
      console.log(chalk.bgGreen.bold(`Collection '${collectionName}' is not empty. Skipping import.`));
    }
  } catch (error )  {
    console.error(chalk.bgRed("Error importing data:"));
    console.log((error as Error).message);
  }
}


const setupDB = async () =>{
  await importDataIfCollectionEmpty("blogs");
  await importDataIfCollectionEmpty("users");
}

export default setupDB;
