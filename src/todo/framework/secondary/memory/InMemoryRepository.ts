import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";
import {NewTodoRepository} from "@/todo/application/newTodo/NewTodoRepository";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";
import {Todo} from "@/todo/domain/Todo";


export class InMemoryRepository implements FetchAllRepository, NewTodoRepository, UpdateStatusRepository {

    static readonly INSTANCE = new InMemoryRepository();

    private todos: Todo[] = [];

    private constructor() {
    }


    async findAll(): Promise<Todo[]> {
        return this.todos;
    }

    async store(todo: Todo): Promise<Todo> {
        const idAdded = Todo.fromBuilder(this.toBuilder(todo));
        this.todos = [...this.todos, idAdded];
        return idAdded;

    }

    private toBuilder(todo: Todo) {
        const id = todo.id ||  (this.todos.length + 1).toString();
        return {...todo.toBuilder() , id}
    }

    async findTodoById(id: string): Promise<Todo | undefined> {
        return this.todos.find(t => t.id === id);
    }

    async updateTodo(todo: Todo): Promise<Todo> {
        const dateUpdate = Todo.fromBuilder({...this.toBuilder(todo), updatedAt: new Date()});

        this.todos = this.todos.map(t => t.id === dateUpdate.id ? dateUpdate : t)

        return dateUpdate;
    }

}


