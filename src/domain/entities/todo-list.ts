import Todo from './todo';

export default class TodoList {
  public constructor(public readonly todoList: Todo[] = []) {}

  public addItem(todo: Todo): TodoList {
    return new TodoList([...this.todoList, todo]);
  }

  public editItem(todo: Todo): TodoList {
    return new TodoList([
      ...this.todoList.filter((item) => item.id !== todo.id),
      todo,
    ]);
  }

  public removeItem(id: string): TodoList {
    return new TodoList([...this.todoList.filter((item) => item.id !== id)]);
  }

  public getCompletedItem(): Todo[] {
    return this.todoList.filter((item) => item.completed);
  }

  public getUnCompletedItem(): Todo[] {
    return this.todoList.filter((item) => !item.completed);
  }
}
