import { databases } from "./config";
import createUsersCollection from "./models/user.model";
import { DB_NAME } from "./name";

export default async function getOrCreateDB(){
  try {
    await databases.get(DB_NAME)
    console.log("Database connection")
  } catch (error) {
    try {
      await databases.create(DB_NAME, DB_NAME)
      console.log("database created")
      //create collections
      await createUsersCollection()
      console.log("Collection created")
      console.log("Database connected")
    } catch (error) {
      console.log("Error creating databases or collection", error)
    }
  }

  return databases
}