import {Todo} from "@/todo/domain/Todo";

export interface NewTodoRepository {
    store(todo: Todo): Promise<Todo>
}