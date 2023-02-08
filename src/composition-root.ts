import TodoListStoreRepository from './data/todo-list-store-repository';
import AddTodoUseCase from './domain/usecases/add-todo-usecase';
import EditTodoUseCase from './domain/usecases/edit-todo-usecase';
import GetTodosUseCase from './domain/usecases/get-todos-usecase';
import RemoveTodoUseCase from './domain/usecases/remove-todo-usecase';
import ToggleCompletedAllUseCase from './domain/usecases/toggle-completed-all-usecase';
import TodoBloc from './presentation/todo-bloc';

export const provideTodoBloc = (): TodoBloc => {
  const todoListRepository = new TodoListStoreRepository(localStorage);
  const addTodoUseCase = new AddTodoUseCase(todoListRepository);
  const editTodoUseCase = new EditTodoUseCase(todoListRepository);
  const getTodosUseCase = new GetTodosUseCase(todoListRepository);
  const removeTodoUseCase = new RemoveTodoUseCase(todoListRepository);
  const toggleCompletedAllUseCase = new ToggleCompletedAllUseCase(
    todoListRepository
  );
  const todoBloc = new TodoBloc(
    addTodoUseCase,
    editTodoUseCase,
    getTodosUseCase,
    removeTodoUseCase,
    toggleCompletedAllUseCase
  );

  return todoBloc;
};
