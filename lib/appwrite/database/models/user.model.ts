import { Permission } from "node-appwrite";
import { databases } from "../config";
import { DB_NAME, USER_COLLECTION } from "../name";

export default async function createUsersCollection() {
    // Creating Collection
    await databases.createCollection(DB_NAME, USER_COLLECTION, USER_COLLECTION, [
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("User Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(DB_NAME, USER_COLLECTION, "clerkId", 150, true),
        databases.createStringAttribute(DB_NAME, USER_COLLECTION, "email", 100, true),
        databases.createStringAttribute(DB_NAME, USER_COLLECTION, "username", 50, true),
        databases.createStringAttribute(DB_NAME, USER_COLLECTION, "photo", 1000, true),
        databases.createStringAttribute(DB_NAME, USER_COLLECTION, "firstName", 50, false),
        databases.createStringAttribute(DB_NAME, USER_COLLECTION, "lastName", 50, false),
        databases.createIntegerAttribute(DB_NAME, USER_COLLECTION, "planId", false,0,10,1),
        databases.createIntegerAttribute(DB_NAME, USER_COLLECTION, "creditBalance", false,0,10000,15),
    ]);
    console.log("User Attributes Created");
}