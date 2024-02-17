import {Todo} from "@/todo/domain/Todo";

export interface FetchAllRepository {
    findAll(): Promise<Todo[]>
}