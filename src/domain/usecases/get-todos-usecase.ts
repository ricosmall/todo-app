import TodoList from '../entities/todo-list';
import TodoListRepository from '../repositories/todo-list-repository';

export default class GetTodosUseCase {
  constructor(private todoListRepository: TodoListRepository) {}

  public execute(): TodoList {
    return this.todoListRepository.getAll();
  }
}
