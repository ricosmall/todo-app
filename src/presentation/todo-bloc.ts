import Todo from '../domain/entities/todo';
import TodoList from '../domain/entities/todo-list';
import AddTodoUseCase from '../domain/usecases/add-todo-usecase';
import EditTodoUseCase from '../domain/usecases/edit-todo-usecase';
import GetTodosUseCase from '../domain/usecases/get-todos-usecase';
import RemoveTodoUseCase from '../domain/usecases/remove-todo-usecase';
import ToggleCompletedAllUseCase from '../domain/usecases/toggle-completed-all-usecase';
import Bloc from './bloc';
import { todoInitialState, TodoState } from './todo-state';

export default class TodoBloc extends Bloc<TodoState> {
  public constructor(
    private addTodoUseCase: AddTodoUseCase,
    private editTodoUseCase: EditTodoUseCase,
    private getTodosUseCase: GetTodosUseCase,
    private removeTodoUseCase: RemoveTodoUseCase,
    private toggleCompletedAllUseCase: ToggleCompletedAllUseCase
  ) {
    super(todoInitialState);

    this.loadTodoList();
  }

  public onAddTodo(description: string): void {
    const todoList = this.addTodoUseCase.execute(description);
    this.updateTodoListState(todoList);
  }

  public onToggleCompleted(todo: Todo): void {
    const todoList = this.editTodoUseCase.execute({
      ...todo,
      completed: !todo.completed,
    });
    this.updateTodoListState(todoList);
  }

  public onEditDescription(todo: Todo, description: string): void {
    const todoList = this.editTodoUseCase.execute({
      ...todo,
      description,
    });
    this.updateTodoListState(todoList);
  }

  public onRemoveTodo(id: string): void {
    const todoList = this.removeTodoUseCase.execute(id);
    this.changeState(todoList);
  }

  public removeAllCompletedTodos(): void {
    const todoList = this.getTodosUseCase.execute();
    const ids = todoList.todoList
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    const editedTodoList = ids.reduce(
      (todoList, id) => this.removeTodoUseCase.execute(id),
      todoList
    );
    this.changeState(editedTodoList);
  }

  public toggleCompletedAll(): void {
    const todoList = this.toggleCompletedAllUseCase.execute();
    this.changeState(todoList);
  }

  private loadTodoList(): void {
    const todoList = this.getTodosUseCase.execute();
    this.updateTodoListState(todoList);
  }

  private updateTodoListState(todoList: TodoList): void {
    this.changeState({
      ...this.state,
      todoList: todoList.todoList,
    });
  }
}
