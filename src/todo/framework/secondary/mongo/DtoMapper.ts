import {Todo, TodoBuilder} from "@/todo/domain/Todo";
import {EnhancedOmit, InferIdType, ObjectId} from "mongodb";
import {TodoDto} from "@/todo/framework/secondary/mongo/TodoDto";

export const fromDomain = (todo: Todo) : TodoDto => {

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
export const toBuilder = (todo: EnhancedOmit<TodoDto, "_id"> & { _id: InferIdType<TodoDto> }) : TodoBuilder => {
    return {
        id: todo._id?.toHexString(),
        title: todo.title,
        description: todo.description,
        status: todo.status,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt
    };
};