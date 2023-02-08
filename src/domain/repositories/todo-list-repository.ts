import Todo from '../entities/todo';
import TodoList from '../entities/todo-list';

export default interface TodoListRepository {
  getAll(): TodoList;
  getById(id: string): Todo | undefined;
  save(todoList: TodoList): boolean;
}
