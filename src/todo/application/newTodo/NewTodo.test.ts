import {NewTodo, NewTodoUseCase} from './NewTodo';
import {NewTodoRepository} from './NewTodoRepository';
import {NewTodoCommand} from "@/todo/application/newTodo/NewTodoCommand";
import {Todo} from "@/todo/domain/Todo";
import {expect, it} from "@jest/globals";

describe('NewTodo', () => {
    describe("Given a valid command when create is called ", () => {
        let todos: Todo[];
        let newTodo: NewTodoUseCase;

        beforeEach(() => {
            todos = [];
            const dummyRepo: NewTodoRepository = {
                store: async (todo: Todo): Promise<Todo> => {
                    todos = [...todos, todo];
                    return todo;
                }
            }
            newTodo = new NewTodo(dummyRepo);

        })


        const newTodoCommand: NewTodoCommand = {
            title: 'My first todo',
            description: 'This is my first todo.',
        };

        it('should create a new todo', async () => {
            const todo = await newTodo.create(newTodoCommand);
            expect(todo).toBeInstanceOf(Todo);
        });

        it('should set correct title for new todo', async () => {
            const todo = await newTodo.create(newTodoCommand);
            expect(todo.title.value).toBe(newTodoCommand.title);
        });

        it('should set correct description for new todo', async () => {
            const todo = await newTodo.create(newTodoCommand);
            expect(todo.description.value).toBe(newTodoCommand.description);
        });

        it('should store the new todo', async () => {
            await newTodo.create(newTodoCommand);
            expect(todos.length).toBe(1);
        });
    });


    describe("Given a command with invalid values and the created is called", () => {

        let newTodo: NewTodoUseCase;

        beforeEach(() => {
            const dummyRepo: NewTodoRepository = {
                store: async (todo: Todo): Promise<Todo> => todo
            }
            newTodo = new NewTodo(dummyRepo);

        })


        it('should throw an error if the title is empty', async () => {
            const newTodoCommand: NewTodoCommand = {
                title: '',
                description: 'valid',
            };
            await expect(newTodo.create(newTodoCommand)).rejects.toThrow();
        });

        it('should throw an error if the description is empty', async () => {
            const newTodoCommand: NewTodoCommand = {
                title: 'valid ',
                description: '',
            };
            await expect(newTodo.create(newTodoCommand)).rejects.toThrow();
        });

    })


    it("Given a valid command but an error happens on the repository when the created is called should throw an error", async () => {

        const dummyRepo: NewTodoRepository = {
            store: async (): Promise<Todo> => {
                throw new Error('Error storing todo');
            }
        };

        const newTodo: NewTodoUseCase = new NewTodo(dummyRepo)

        const newTodoCommand: NewTodoCommand = {
            title: 'My first todo',
            description: 'This is my first todo.',
        };
        await expect(newTodo.create(newTodoCommand)).rejects.toThrow('Error storing todo');

    })

});