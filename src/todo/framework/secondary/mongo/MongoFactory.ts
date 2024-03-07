import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";
import {RepositoryFactory} from "@/todo/framework/config/RepositoryFactory";
import {DbClient} from "@/todo/framework/secondary/mongo/DatabaseClient";
import {MongoRepository} from "@/todo/framework/secondary/mongo/MongoRepository";

export class MongoFactory implements RepositoryFactory {
    private static INSTANCE :MongoFactory = new MongoFactory();

    private constructor() {
    }

    static getInstance(){
        console.log("Creating Mongo instances")
        if(!MongoFactory.INSTANCE){
            MongoFactory.INSTANCE = new MongoFactory();
        }
        return MongoFactory.INSTANCE;
    }


    private repository: MongoRepository | undefined

    createFetchAllRepository = async (): Promise<FetchAllRepository> => await this.initRepo();

    createNewTodoRepository = async (): Promise<NewTodoRepository> => await this.initRepo();

    createUpdateStatusRepository = async (): Promise<UpdateStatusRepository> => await this.initRepo();

    private async initRepo() {
        if (!this.repository) {
            const dbClient = await DbClient.getInstance();
            this.repository = new MongoRepository(dbClient.db);
        }
        return this.repository;
    }

}