import {ValidStatus} from "@/todo/domain/status/Status";
import {Todo} from "@/todo/domain/Todo";

export class TodoUIDTO {


    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly status: ValidStatus;
    readonly createdAt: string;
    readonly updatedAt: string;


    private constructor(id: string, title: string, description: string, status: ValidStatus, createdAt: string, updatedAt: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    get isCompleted() {
        return this.status === 'completed';
    }


    static fromDomain(todo: Todo): TodoUIDTO {
        return new TodoUIDTO(todo.id!, todo.title.value!, todo.description.value!, todo.status.value, todo.createdAt.toISOString(), todo.updatedAt.toISOString())
    }


}