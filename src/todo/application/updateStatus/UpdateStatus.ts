import {Todo} from "@/todo/domain/Todo";
import {UpdateStatusCommand} from "@/todo/application/updateStatus/UpdateStatusCommand";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";


export interface UpdateStatusUseCase {

    updateTodoStatus(command: UpdateStatusCommand): Promise<Todo>

}

export class UpdateStatus implements UpdateStatusUseCase {

    constructor(private readonly repository: UpdateStatusRepository) {
    }

    async updateTodoStatus(command: UpdateStatusCommand): Promise<Todo> {
        const oldTodo = await this.repository.findTodoById(command.id);
        if (!oldTodo) {
            throw new Error(`The todo with id ${command.id}  could not be found`)
        }
        return this.repository.updateTodo(oldTodo.updateStatus());
    }
}


