import { Movie } from "@/interfaces/interfaces";
import Constants from "expo-constants";
import { title } from "process";
//import "dotenv/config"; 
import { Client, Account, Models, TablesDB, Query, ID } from 'react-native-appwrite';

// track searches made by user
type Env = {
    DATABASE_ID: string,
    TABLE_ID: string,
    ENDPOINT: string,

}

const { appwriteDatabaseId, appwriteProjectId, appwriteEndpoint, appwriteTableId, appwriteProjectName, } = Constants.expoConfig?.extra ?? {};


const TABLE_ID = appwriteTableId;
const PROJECT_ID = appwriteProjectId!;
const ENDPOINT = appwriteEndpoint;
const DATABASE_ID = appwriteDatabaseId!;

const client = new Client()
client
.setEndpoint(ENDPOINT)
.setProject(PROJECT_ID)


const tablesDB = new TablesDB(client);

export const updateSearchCount = async(query:string, movie:Movie[]) => {
    const firstMovie = movie[0];
    //console.log(firstMovie)

    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries: [
            Query.equal('searchTerm', query)
        ]
    })

    const rows = result?.rows ?? [];

 // Check if the record of that search has already been stored
    if(rows.length > 0) {
        const existingMovie = result.rows[0];

        await tablesDB.updateRow<Models.DefaultRow>({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: existingMovie.$id,
            data: {
                count: existingMovie.count + 1,
            },
        });
        console.log(`movie already exist. Count updated`)
    }else{
        await tablesDB.createRow<Models.DefaultRow>({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: ID.unique(),
            data: {
                searchTerm: query,
                movie_id: firstMovie.id,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}`,
                title: firstMovie.title,
            }

        });
        console.log('No existing records, newmovie sent to appwrite Database  ', firstMovie.title)

    }

    //console.log("ListRows result:", JSON.stringify(result, null, 2));


  //console.log(result);

   
    // If document is found, implement searchCount Field
    // If no document is found
        //create a new document in Appwrite database -> 1
   //console.log(appwriteDatabaseId, appwriteProjectId, appwriteEndpoint, appwriteTableId, appwriteProjectName);
}
