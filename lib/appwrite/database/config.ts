import { Databases, Client } from "node-appwrite";

const client = new Client();

if (
  process.env.NEXT_PUBLIC_APPWRITE_HOST_URL &&
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
  process.env.APPWRITE_API_KEY
) {
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY); // Your secret API key
}

const databases = new Databases(client);

export { databases };
