import {Todo} from "@/todo/domain/Todo";
import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";


export interface FetchAllUseCase {
    findAll(): Promise<Todo[]>
}


export class FetchAll implements FetchAllUseCase {

    constructor(private readonly repository: FetchAllRepository) {
    }

    findAll = async () => this.repository.findAll();


}




