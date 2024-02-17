import {Todo, TodoBuilder} from './Todo';
import {Title} from "@/todo/domain/title/Title";
import {Description} from "@/todo/domain/description/Description";
import {Pending} from "@/todo/domain/status/Status";

describe('Todo', () => {
    describe('When of() is called', () => {
        const title = 'Test ToDo';
        const description = 'Test description';
        const todo = Todo.of(title, description);

        it('should return new Todo instance', () => {
            expect(todo).toBeInstanceOf(Todo);
        });

        it('should set correct title instance', () => {
            expect(todo.title).toBeInstanceOf(Title);
        });

        it('should set correct title value', () => {
            expect(todo.title.value).toEqual(title);
        });

        it('should set correct description instance', () => {
            expect(todo.description).toBeInstanceOf(Description);
        });

        it('should set correct description value', () => {
            expect(todo.description.value).toEqual(description);
        });

        it('should initialize with a Pending status', () => {
            expect(todo.status).toBeInstanceOf(Pending);
        });
    });

    describe('when updateStatus() is called', () => {
        const todo = Todo.of('Test ToDo', 'Test description');
        const updatedTodo = todo.updateStatus();

        it('should return a new Todo instance', () => {
            expect(updatedTodo).toBeInstanceOf(Todo);
        });

        it('should not have the initial status', () => {
            expect(updatedTodo.status).not.toEqual(todo.status);
        });
    });

    describe('when fromBuilder() is called', () => {
        const builder: TodoBuilder = {
            title: 'Test ToDo',
            description: 'Test description',
        };
        const todo = Todo.fromBuilder(builder);

        it('should return a new Todo instance', () => {
            expect(todo).toBeInstanceOf(Todo);
        });

        it('should set the correct title value', () => {
            expect(todo.title.value).toEqual(builder.title);
        });

        it('should set the correct description value', () => {
            expect(todo.description.value).toEqual(builder.description);
        });
    });
});