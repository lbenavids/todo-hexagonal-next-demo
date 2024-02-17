import {Title} from "@/todo/domain/title/Title";
import {Description} from "@/todo/domain/description/Description";
import {Pending, Status, ValidStatus} from "@/todo/domain/status/Status";
import {statusFactory} from "@/todo/domain/status/statusFactory";


export interface TodoBuilder {
    id?: string;
    title?: string;
    description?: string;
    status?: ValidStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Todo {


    private constructor(
        readonly title: Title,
        readonly description: Description,
        readonly status: Status,
        readonly id?: string,
        readonly createdAt: Date = new Date(),
        readonly updatedAt: Date = new Date(),
    ) {

    }

    static of(title: string, description: string): Todo {
        return new Todo(new Title(title), new Description(description), new Pending())
    }

    updateStatus(): Todo {
        return new Todo(
            this.title,
            this.description,
            this.status.nextStatus(),
            this.id,
            this.createdAt
        )
    }


    static fromBuilder(builder: TodoBuilder): Todo {
        return new Todo(
            new Title(builder.title),
            new Description(builder.description),
            statusFactory(builder.status),
            builder.id,
            builder.createdAt,
            builder.updatedAt,
        );
    }

}