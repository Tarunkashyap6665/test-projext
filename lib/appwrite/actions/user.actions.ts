"use server";

import { revalidatePath } from "next/cache";

import { databases } from "../database/config";
import { DB_NAME, USER_COLLECTION } from "../database/name";
import { ID, Query } from "node-appwrite";
import { handleError } from "@/lib/utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    const userExist= await databases.listDocuments(DB_NAME,USER_COLLECTION,[
      Query.equal("clerkId",user.clerkId)
    ])

    if(userExist.documents[0]) return JSON.parse(JSON.stringify(userExist.documents[0]));

    const newUser = await databases.createDocument(
      DB_NAME,
      USER_COLLECTION,
      ID.unique(),
      user
    );

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// READ
export async function getUserById(userId: string) {
  try {
    // await delay(1000)
    let user = await databases.listDocuments(DB_NAME, USER_COLLECTION, [
      Query.equal("clerkId", userId),
    ]);

    if (!user.documents[0]) {
      delay(400)
      user = await databases.listDocuments(DB_NAME, USER_COLLECTION, [
        Query.equal("clerkId", userId),
      ]);
    };

    return user.documents[0];
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const usr = await databases.listDocuments(DB_NAME, USER_COLLECTION, [
      Query.equal("clerkId", clerkId),
    ]);

    if (!user) return;
    const updatedUser = await databases.updateDocument(
      DB_NAME,
      USER_COLLECTION,
      usr.documents[0].$id,
      user
    );

    if (!updatedUser) throw new Error("User update failed");

    return updatedUser;
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    // Find user to delete
    const userToDelete = await databases.listDocuments(DB_NAME, USER_COLLECTION, [
      Query.equal("clerkId", clerkId),
    ]);

    if (!userToDelete.documents[0]) {
      return  -1
    }

    // Delete user
    const deletedUser = await databases.deleteDocument(DB_NAME, USER_COLLECTION, userToDelete.documents[0].$id)
    revalidatePath("/");

    return deletedUser ? deletedUser : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    const usr = await databases.getDocument(DB_NAME, USER_COLLECTION, userId)

    const updatedUserCredits = await databases.updateDocument(DB_NAME, USER_COLLECTION, userId, {
      creditBalance:usr.creditBalance + creditFee
    })

    

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return updatedUserCredits;
  } catch (error) {
    handleError(error);
  } 
}
