import Todo from '../entities/todo';
import TodoList from '../entities/todo-list';
import { generateId } from '../helper';
import TodoListRepository from '../repositories/todo-list-repository';

export default class AddTodoUseCase {
  public constructor(private todoListRepository: TodoListRepository) {}

  public execute(description: string): TodoList {
    const todoList = this.todoListRepository.getAll();

    const todo: Todo = {
      id: generateId(),
      description,
      completed: false,
    };

    const editedTodoList = todoList.addItem(todo);
    this.todoListRepository.save(editedTodoList);
    return editedTodoList;
  }
}
