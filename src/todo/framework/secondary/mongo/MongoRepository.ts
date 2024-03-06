import * as mongoDB from "mongodb";
import {Collection, EnhancedOmit, InferIdType, ObjectId} from "mongodb";
import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";
import {Todo, TodoBuilder} from "@/todo/domain/Todo";
import {ValidStatus} from "@/todo/domain/status/Status";


async function connectToDatabase() {

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db("todos-demo");


    console.log(`Successfully connected to database: ${db.databaseName}`);

    return db;
}


const fromDomain = (todo: Todo) => {

    const objectId = todo.id ? ObjectId.createFromHexString(todo.id) : undefined;


    return {
        title: todo.title.value!,
        description: todo.description.value!,
        status: todo.status.value,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
        id: objectId
    }
}

interface TodoDto {
    readonly title: string,
    readonly description: string,
    readonly status: ValidStatus,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly id?: ObjectId,


}

const toBuilder = (todo: EnhancedOmit<TodoDto, "_id"> & { _id: InferIdType<TodoDto> }) => {
    const builder: TodoBuilder = {
        id: todo._id?.toHexString(),
        title: todo.title,
        description: todo.description,
        status: todo.status,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt
    }
    return builder;
};


export class MongoRepository implements FetchAllRepository, NewTodoRepository, UpdateStatusRepository {


    private collection: Collection<TodoDto>;

    constructor(private readonly db: mongoDB.Db) {


        this.collection = db.collection<TodoDto>("todos");


    }


    async findTodoById(id: string): Promise<Todo | undefined> {

        let objectId = ObjectId.createFromHexString(id);

        const found = await this.collection.findOne({_id: objectId});


        if (!found) return undefined;
        const builder = toBuilder(found);


        return Todo.fromBuilder(builder)
    }

    async updateTodo(todo: Todo): Promise<Todo> {

        if (!todo.id) throw new Error(`there is not a todo with Id ${todo.id}`)

        let id = ObjectId.createFromHexString(todo.id);

        let update = fromDomain(todo);
        await this.collection.updateOne({_id: id}, {$set: {status: update.status, updatedAt: update.updatedAt}})
        return todo;
    }

    async store(todo: Todo): Promise<Todo> {
        let inserted = await this.collection.insertOne(fromDomain(todo));

        let id = inserted.insertedId.toHexString();


        return Todo.fromBuilder({...todo.toBuilder(), id})
    }

    async findAll(): Promise<Todo[]> {
        const todos = await this.collection.find().toArray();
        return todos.map(todo => {
            const builder = toBuilder(todo);
            return Todo.fromBuilder(builder);
        });
    }

}


export const createMongoInstance = async () => {
    let dbPromise = await connectToDatabase();

    return new MongoRepository(dbPromise);
}