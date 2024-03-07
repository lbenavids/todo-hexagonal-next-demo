import * as mongoDB from "mongodb";
import {Collection, ObjectId} from "mongodb";
import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";
import {Todo} from "@/todo/domain/Todo";
import {TodoDto} from "@/todo/framework/secondary/mongo/TodoDto";
import {fromDomain, toBuilder} from "@/todo/framework/secondary/mongo/DtoMapper";
import {connectToDatabase} from "@/todo/framework/secondary/mongo/DatabaseClient";


export class MongoRepository implements FetchAllRepository, NewTodoRepository, UpdateStatusRepository {

private static INSTANCE : MongoRepository;

    private collection: Collection<TodoDto>;

    private constructor(db: mongoDB.Db) {
        this.collection = db.collection<TodoDto>("todos");
    }


    static async  getInstance(){
        if(!MongoRepository.INSTANCE){
            const db = await connectToDatabase();
            MongoRepository.INSTANCE = new MongoRepository(db);
        }
        return MongoRepository.INSTANCE;
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


export const createMongoInstance = async () => MongoRepository.getInstance()