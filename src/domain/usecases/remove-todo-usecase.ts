import TodoList from '../entities/todo-list';
import TodoListRepository from '../repositories/todo-list-repository';

export default class RemoveTodoUseCase {
  public constructor(private todoListRepository: TodoListRepository) {}

  public execute(id: string): TodoList {
    const todoList = this.todoListRepository.getAll();
    const editedTodoList = todoList.removeItem(id);
    this.todoListRepository.save(editedTodoList);
    return editedTodoList;
  }
}
