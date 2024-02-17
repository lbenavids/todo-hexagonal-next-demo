import { FetchAll } from './FetchAll';
import {Todo} from "@/todo/domain/Todo";
import {FetchAllRepository} from "@/todo/application/fetchAll/FetchAllRepository";


class DummyFetchAllRepository implements FetchAllRepository  {
    async findAll(): Promise<Todo[]> {
        return [
           Todo.of("First", "Explanation of first"),
           Todo.of("Second", "Explanation of second"),
        ];
    }
}

describe('FetchAll Tests', () => {
  let fetchAll: FetchAll;

  beforeEach(() => {
    const dummyRepository = new DummyFetchAllRepository();
    fetchAll = new FetchAll(dummyRepository);
  });

  it('tests if findAll function returns all todos', async () => {
    const expectedResult: Todo[] = [
        Todo.of("First", "Explanation of first"),
        Todo.of("Second", "Explanation of second"),
    ];

    const result = await fetchAll.findAll();

    expect(result).toEqual(expectedResult);
  });
});