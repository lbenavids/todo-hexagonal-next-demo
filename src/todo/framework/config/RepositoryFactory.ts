import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";
import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";


export interface RepositoryFactory {
    createFetchAllRepository(): Promise<FetchAllRepository>

    createNewTodoRepository(): Promise<NewTodoRepository>

    createUpdateStatusRepository(): Promise<UpdateStatusRepository>
}