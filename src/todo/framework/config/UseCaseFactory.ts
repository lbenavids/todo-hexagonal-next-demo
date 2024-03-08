import {FetchAll, FetchAllUseCase} from "@/todo/application/fetchAll/FetchAll";
import {NewTodo, NewTodoUseCase} from "@/todo/application/newTodo/NewTodo";
import {UpdateStatus, UpdateStatusUseCase} from "@/todo/application/updateStatus/UpdateStatus";
import {RepositoryFactory} from "@/todo/framework/config/RepositoryFactory";
import {MongoFactory} from "@/todo/framework/secondary/mongo/MongoFactory";
import {MemoryFactory} from "@/todo/framework/secondary/memory/MemoryFactory";

export interface UseCaseFactory {
    createFetchAll(): Promise<FetchAllUseCase>

    createNewTodo(): Promise<NewTodoUseCase>

    createUpdateStatus(): Promise<UpdateStatusUseCase>
}

class UseCasesFac implements UseCaseFactory {
    private fetchAll: FetchAllUseCase | undefined;
    private newTodo: NewTodoUseCase | undefined;
    private updateStatus: UpdateStatusUseCase | undefined;

    constructor(private readonly repoFactory: RepositoryFactory) {
    }

    async createFetchAll(): Promise<FetchAllUseCase> {
        if (!this.fetchAll) {
            this.fetchAll = new FetchAll(await this.repoFactory.createFetchAllRepository());
        }
        return this.fetchAll;
    }

    async createNewTodo(): Promise<NewTodoUseCase> {
        if (!this.newTodo) {
            this.newTodo = new NewTodo(await this.repoFactory.createNewTodoRepository());
        }
        return this.newTodo;
    }

    createUpdateStatus = async (): Promise<UpdateStatusUseCase> => {
        if (!this.updateStatus) {
            this.updateStatus = new UpdateStatus(await this.repoFactory.createUpdateStatusRepository());
        }
        return this.updateStatus;
    };
}

const databaseType = process.env.DATABASE_TYPE;
console.log("databaseType =>", databaseType)

const factory: RepositoryFactory = databaseType === "mongodb" ? MongoFactory.getInstance() : MemoryFactory.getInstance();

export const useCaseFactory: UseCaseFactory = new UseCasesFac(factory)