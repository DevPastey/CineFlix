import Constants from "expo-constants";
import { Client, Account, ID, Models, TablesDB, Query } from 'react-native-appwrite';


// track searches made by user


const { appwriteDatabaseId, appwriteProjectId, appwriteEndpoint, appwriteTableId, appwriteProjectName, } = Constants.expoConfig?.extra ?? {};

const DATABASE_ID = appwriteDatabaseId;
const TABLE_ID = appwriteTableId;

const client = new Client()
client
.setEndpoint(appwriteEndpoint)
.setProject(appwriteProjectName)


const tablesDB = new TablesDB(client);

export const updateSearchCount = async(query:string, movie:Movie) => {
    const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [
        Query.equal('searchTerm', query)
    ]
})

 //console.log(result);

    // Check if the record of that search has already been stored
    // If document is found, implement searchCount Field
    // If no document is found
        //create a new document in Appwrite database -> 1
    console.log(appwriteDatabaseId, appwriteProjectId, appwriteEndpoint, appwriteTableId, appwriteProjectName);
}
