import Todo from '../domain/entities/todo';

export interface TodoState {
  todoList: Todo[];
}

export const todoInitialState: TodoState = {
  todoList: [],
};
