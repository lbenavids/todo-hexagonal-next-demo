import {Todo} from "@/todo/domain/Todo";
import {EnhancedOmit, InferIdType, ObjectId} from "mongodb";
import {TodoDto} from "@/todo/framework/secondary/mongo/TodoDto";


export class DtoMapper {


    fromDomain(todo: Todo): TodoDto {

        const objectId = todo.id ? ObjectId.createFromHexString(todo.id) : undefined;

        return {
            title: todo.title.value!,
            description: todo.description.value!,
            status: todo.status.value,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
            id: objectId
        }
    }

    toDomain(dto: EnhancedOmit<TodoDto, "_id"> & { _id: InferIdType<TodoDto> }): Todo{
        const builder = {
            id: dto._id?.toHexString(),
            title: dto.title,
            description: dto.description,
            status: dto.status,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt
        };

        return Todo.fromBuilder(builder);
    }
}


