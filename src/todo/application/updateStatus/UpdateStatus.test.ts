import {UpdateStatus} from './UpdateStatus';
import {Todo} from "@/todo/domain/Todo";
import {Working} from "@/todo/domain/status/Status";
import {UpdateStatusCommand} from "@/todo/application/updateStatus/UpdateStatusCommand";
import {UpdateStatusRepository} from "@/todo/application/updateStatus/UpdateStatusRepository";


class DummyUpdateStatusRepository implements UpdateStatusRepository {
    private todos: Todo[] = [];

    async findTodoById(id: string): Promise<Todo | undefined> {
        return this.todos.find(todo => todo.id == id);
    }

    async updateTodo(todo: Todo): Promise<Todo> {
        this.todos = this.todos.map(t => t.id === todo.id ? todo : t)

        return todo;
    }

    addTodo(todo: Todo) {
        this.todos.push(todo)
    }

    clear() {
        this.todos = [];
    }

}

describe("UpdateStatus", () => {
    let repo: DummyUpdateStatusRepository = new DummyUpdateStatusRepository();
    let updateStatus: UpdateStatus = new UpdateStatus(repo);

    beforeEach(() => {
        repo.clear()
    });

    describe("Given an id when the update is called ", () => {
        async function update() {
            const testTodo = Todo.fromBuilder({id: "dummy id", description: "Dummy description", title: "Dummy Title"})
            const command: UpdateStatusCommand = {id: testTodo.id!!};

            repo.clear();
            repo.addTodo(testTodo);

            const updatedTodo: Todo = await updateStatus.updateTodoStatus(command);
            return {testTodo, updatedTodo};
        }


        it('should update todo status to working', async () => {
            const {updatedTodo} = await update();
            expect(updatedTodo.status).toBeInstanceOf(Working);
        });

        it('should maintain the same id after updating the status', async () => {
            let {testTodo, updatedTodo} = await update();
            expect(updatedTodo.id).toBe(testTodo.id);
        });

        it('should return updated todo', async () => {
            let {updatedTodo} = await update();
            expect(updatedTodo).not.toBeUndefined();
        });


    })


    it('should throw error when todo not found', async () => {
        const command: UpdateStatusCommand = {id: "unknownId"};
        await expect(updateStatus.updateTodoStatus(command)).rejects.toThrow(`The todo with id ${command.id}  could not be found`);
    });

});