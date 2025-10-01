// track searches made by user

import Constants from "expo-constants";

const { appwriteDatabaseId, appwriteProjectId, appwriteEndpoint, appwriteTableId, appwriteProjectName} = Constants.expoConfig?.extra ?? {};

const DATABASE_ID =

export const updateSearchCount = async (query:string, movie:Movie) => {
    // Check if the record of that search has already been stored
    // If document is found, implement searchCount Field
    // If no document is found
        //create a new document in Appwrite database -> 1
console.log(a)
     console.log(appwriteDatabaseId, appwriteProjectId, appwriteEndpoint, appwriteTableId, appwriteProjectName)
}
