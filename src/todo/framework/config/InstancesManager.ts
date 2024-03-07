import {FetchAll, FetchAllUseCase} from "@/todo/application/fetchAll/FetchAll";
import {InMemoryRepository} from "@/todo/framework/secondary/memory/InMemoryRepository";
import {NewTodo, NewTodoUseCase} from "@/todo/application/newTodo/NewTodo";
import {UpdateStatus, UpdateStatusUseCase} from "@/todo/application/updateStatus/UpdateStatus";
import {Todo} from "@/todo/domain/Todo";
import {createMongoInstance, MongoRepository} from "@/todo/framework/secondary/mongo/MongoRepository";
import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";


let status = "not_started"
export let fetchAll: FetchAllUseCase;
export let newTodo: NewTodoUseCase;
export let updateStatus: UpdateStatusUseCase;

export const initApp = async () => {

    if(status === 'not_started'){
        status = 'waiting'
        const mongoRepository = await  MongoRepository.getInstance();

        const fetchAllRepository: FetchAllRepository = mongoRepository;
        const newTodoRepository: NewTodoRepository = mongoRepository;
        const updateStatusRepository: UpdateStatusRepository = mongoRepository;

        // await repository.store(Todo.of("Dummy 1", "Hello there 1"));
        // await repository.store(Todo.of("Dummy 2", "Hello there 2").updateStatus());
        // await repository.store(Todo.of("Dummy 3", "Hello there 3").updateStatus().updateStatus());
        // await repository.store(Todo.of("Dummy 4", "Hello there 1"));
        // await repository.store(Todo.of("Dummy 5", "Hello there 2").updateStatus());
        // await repository.store(Todo.of("Dummy 6", "Hello there 3").updateStatus().updateStatus());

        fetchAll = new FetchAll(fetchAllRepository);
        newTodo = new NewTodo(newTodoRepository);
        updateStatus = new UpdateStatus(updateStatusRepository);
        status = 'done'
    }

    return status
}


