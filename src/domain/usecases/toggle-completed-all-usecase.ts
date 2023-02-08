import TodoList from '../entities/todo-list';
import TodoListRepository from '../repositories/todo-list-repository';

export default class ToggleCompletedAllUseCase {
  public constructor(private todoListRepository: TodoListRepository) {}

  public execute(): TodoList {
    const todoList = this.todoListRepository.getAll();
    const hasUncompletedTodo = todoList.todoList.some(
      (todo) => !todo.completed
    );

    const completed = hasUncompletedTodo;
    const editedTodoList = todoList.todoList.reduce(
      (todoList, todo) => todoList.editItem({ ...todo, completed }),
      todoList
    );
    this.todoListRepository.save(editedTodoList);

    return editedTodoList;
  }
}
