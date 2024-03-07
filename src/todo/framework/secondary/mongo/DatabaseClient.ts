import * as mongoDB from "mongodb";


let db: mongoDB.Db;


export async function connectToDatabase() {
    if (!db) {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

        await client.connect();

        db = client.db("todos-demo");
        console.log(`Successfully connected to database: ${db.databaseName}`);
    }


    return db;
}