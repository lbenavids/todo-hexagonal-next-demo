import {Todo} from "@/todo/domain/Todo";

export interface UpdateStatusRepository {
    findTodoById(id: string): Promise<Todo | undefined>

    updateTodo(todo: Todo): Promise<Todo>
}