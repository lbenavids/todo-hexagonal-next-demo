import {FetchAll, FetchAllUseCase} from "@/todo/application/fetchAll/FetchAll";
import {InMemoryRepository} from "@/todo/framework/secondary/memory/InMemoryRepository";
import {NewTodo, NewTodoUseCase} from "@/todo/application/newTodo/NewTodo";
import {UpdateStatus, UpdateStatusUseCase} from "@/todo/application/updateStatus/UpdateStatus";
import {Todo} from "@/todo/domain/Todo";
import {createMongoInstance} from "@/todo/framework/secondary/mongo/MongoRepository";


export let fetchAll: FetchAllUseCase;
export let newTodo: NewTodoUseCase;
export let updateStatus: UpdateStatusUseCase;

(async () => {
    const repository = await createMongoInstance();

    // await repository.store(Todo.of("Dummy 1", "Hello there 1"));
    // await repository.store(Todo.of("Dummy 2", "Hello there 2").updateStatus());
    // await repository.store(Todo.of("Dummy 3", "Hello there 3").updateStatus().updateStatus());
    // await repository.store(Todo.of("Dummy 4", "Hello there 1"));
    // await repository.store(Todo.of("Dummy 5", "Hello there 2").updateStatus());
    // await repository.store(Todo.of("Dummy 6", "Hello there 3").updateStatus().updateStatus());

    fetchAll = new FetchAll(repository);
    newTodo = new NewTodo(repository);
    updateStatus = new UpdateStatus(repository);
})().catch(error => {
    // Handle the error
    console.error(error);
});