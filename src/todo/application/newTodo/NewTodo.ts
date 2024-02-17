import {NewTodoCommand} from "@/todo/application/newTodo/NewTodoCommand";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";
import {Todo} from "@/todo/domain/Todo";



export interface NewTodoUseCase{

    create(command: NewTodoCommand): Promise<Todo>
}

export class NewTodo implements NewTodoUseCase{

    constructor(private readonly repository: NewTodoRepository) {
    }
    async create(command: NewTodoCommand): Promise<Todo> {
        const created = Todo.of(command.title, command.description);
        return await this.repository.store(created);
    }

}



