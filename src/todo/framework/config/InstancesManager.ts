import {FetchAll, FetchAllUseCase} from "@/todo/application/fetchAll/FetchAll";
import {NewTodo, NewTodoUseCase} from "@/todo/application/newTodo/NewTodo";
import {UpdateStatus, UpdateStatusUseCase} from "@/todo/application/updateStatus/UpdateStatus";
import {MongoRepository} from "@/todo/framework/secondary/mongo/MongoRepository";
import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";
import {DbClient} from "@/todo/framework/secondary/mongo/DatabaseClient";


export let fetchAll: FetchAllUseCase;
export let newTodo: NewTodoUseCase;
export let updateStatus: UpdateStatusUseCase;

export const initApp = async () => {

    if(!fetchAll){

        const client = await DbClient.getInstance()

        const mongoRepository = new MongoRepository(client.db)
        const fetchAllRepository: FetchAllRepository = mongoRepository;
        const newTodoRepository: NewTodoRepository = mongoRepository;
        const updateStatusRepository: UpdateStatusRepository = mongoRepository;

        fetchAll = new FetchAll(fetchAllRepository);
        newTodo = new NewTodo(newTodoRepository);
        updateStatus = new UpdateStatus(updateStatusRepository);
    }

    return {fetchAll, newTodo, updateStatus}
}




