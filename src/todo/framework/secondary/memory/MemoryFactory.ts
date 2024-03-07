import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";
import {RepositoryFactory} from "@/todo/framework/config/RepositoryFactory";
import {InMemoryRepository} from "@/todo/framework/secondary/memory/InMemoryRepository";


export class MemoryFactory implements RepositoryFactory {

   private static INSTANCE: MemoryFactory;

    static getInstance() {
        console.log("Creating in memory instances")
        if (!MemoryFactory.INSTANCE) {
            MemoryFactory.INSTANCE = new MemoryFactory(new InMemoryRepository())
        }
        return MemoryFactory.INSTANCE;
    }


    private constructor(private readonly repo: InMemoryRepository) {
    }

    createFetchAllRepository = async (): Promise<FetchAllRepository> => this.repo;

    createNewTodoRepository = async (): Promise<NewTodoRepository> => this.repo;

    createUpdateStatusRepository = async (): Promise<UpdateStatusRepository> => this.repo;

}