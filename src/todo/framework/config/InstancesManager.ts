import {FetchAll, FetchAllUseCase} from "@/todo/application/fetchAll/FetchAll";
import {NewTodo, NewTodoUseCase} from "@/todo/application/newTodo/NewTodo";
import {UpdateStatus, UpdateStatusUseCase} from "@/todo/application/updateStatus/UpdateStatus";
import {RepositoryFactory} from "@/todo/framework/config/RepositoryFactory";
import {MongoFactory} from "@/todo/framework/secondary/mongo/MongoFactory";
import {MemoryFactory} from "@/todo/framework/secondary/memory/MemoryFactory";


export let fetchAll: FetchAllUseCase;
export let newTodo: NewTodoUseCase;
export let updateStatus: UpdateStatusUseCase;

const databasetype = process.env.DATABASE_TYPE;

console.log("databasetype =>", databasetype)

const factory: RepositoryFactory = databasetype === "mongodb" ?  MongoFactory.getInstance() : MemoryFactory.getInstance();

export const initApp = async () => {

    if (!fetchAll) {
        fetchAll = new FetchAll(await factory.createFetchAllRepository());
        newTodo = new NewTodo(await factory.createNewTodoRepository());
        updateStatus = new UpdateStatus(await factory.createUpdateStatusRepository());
    }

    return {fetchAll, newTodo, updateStatus}
}




