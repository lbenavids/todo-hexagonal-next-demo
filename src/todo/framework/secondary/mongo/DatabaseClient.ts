import * as mongoDB from "mongodb";


let db: mongoDB.Db;


export async function connectToDatabase() {
    if (!db) {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
        await client.connect();
        db = client.db("todos-demo");
    }
    return db;
}


export class DbClient {

    private static INSTANCE: DbClient;

    private constructor(readonly db: mongoDB.Db) {
    }

    static async getInstance() {

        if (!DbClient.INSTANCE) {
            DbClient.INSTANCE = new DbClient(await connectToDatabase())
        }
        return DbClient.INSTANCE
    }

}
