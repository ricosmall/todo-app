import Todo from '../domain/entities/todo';
import TodoList from '../domain/entities/todo-list';
import TodoListRepository from '../domain/repositories/todo-list-repository';

export default class TodoListStoreRepository implements TodoListRepository {
  public constructor(
    private storage: Storage,
    private key: string = 'todoList'
  ) {}

  public getAll(): TodoList {
    const todos = this.getStorageData();
    return new TodoList(todos);
  }

  public getById(id: string): Todo | undefined {
    return this.getAll().todoList.find((item) => item.id === id);
  }

  public save(todoList: TodoList): boolean {
    this.saveDataToStorage(todoList.todoList);
    return true;
  }

  private getStorageData(): Todo[] {
    const todosData = this.storage.getItem(this.key);
    return JSON.parse(todosData || '[]') as Todo[];
  }

  private saveDataToStorage(data: Todo[]): void {
    this.storage.setItem(this.key, JSON.stringify(data));
  }
}
