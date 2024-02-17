import {FetchAll, FetchAllUseCase} from "@/todo/application/fetchAll/FetchAll";
import {InMemoryRepository} from "@/todo/framework/secondary/memory/InMemoryRepository";
import {NewTodo, NewTodoUseCase} from "@/todo/application/newTodo/NewTodo";
import {UpdateStatus, UpdateStatusUseCase} from "@/todo/application/updateStatus/UpdateStatus";
import {Todo} from "@/todo/domain/Todo";


const repository = InMemoryRepository.INSTANCE;


repository.store(Todo.of("Dummy 1", "Hello there 1"))
repository.store(Todo.of("Dummy 2", "Hello there 2").updateStatus())
repository.store(Todo.of("Dummy 3", "Hello there 3").updateStatus().updateStatus())
repository.store(Todo.of("Dummy 4", "Hello there 1"))
repository.store(Todo.of("Dummy 5", "Hello there 2").updateStatus())
repository.store(Todo.of("Dummy 6", "Hello there 3").updateStatus().updateStatus())


export const fetchAll: FetchAllUseCase = new FetchAll(repository)
export const newTodo: NewTodoUseCase = new NewTodo(repository)
export const updateStatus: UpdateStatusUseCase = new UpdateStatus(repository)