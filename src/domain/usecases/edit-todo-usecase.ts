import Todo from '../entities/todo';
import TodoList from '../entities/todo-list';
import TodoListRepository from '../repositories/todo-list-repository';

export default class EditTodoUseCase {
  public constructor(private todoListRepository: TodoListRepository) {}

  public execute(todo: Todo): TodoList {
    const todoList = this.todoListRepository.getAll();
    const editedTodoList = todoList.editItem(todo);
    this.todoListRepository.save(editedTodoList);
    return editedTodoList;
  }
}
