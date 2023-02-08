import React, { useEffect, useRef, useState } from 'react';
import 'todomvc-app-css/index.css';
import { provideTodoBloc } from './composition-root';
import { useBlocState } from './use-bloc-state';

function App() {
  const bloc = provideTodoBloc();
  const state = useBlocState(bloc);
  const inputRef = useRef<HTMLInputElement>(null);
  const [renderList, setRenderList] = useState(state.todoList);

  const onAddTodo = (e: any) => {
    if (e.key !== 'Enter' || !e.target.value.trim().length) return;
    bloc.onAddTodo(e.target.value);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const completedTodos = state.todoList.filter((todo) => todo.completed);
  const activeTodos = state.todoList.filter((todo) => !todo.completed);

  useEffect(() => {
    const swithList = () => {
      const { hash } = window.location;
      if (hash.includes('completed')) {
        setRenderList(completedTodos);
      } else if (hash.includes('active')) {
        setRenderList(activeTodos);
      } else {
        setRenderList(state.todoList);
      }
    };
    window.addEventListener('hashchange', swithList);

    return () => {
      window.removeEventListener('hashchange', swithList);
    };
  }, []);

  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyUp={onAddTodo}
            ref={inputRef}
          />
        </header>
        {/* <!-- This section should be hidden by default and shown when there are todos --> */}
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" onClick={() => bloc.toggleCompletedAll()}>
            Mark all as complete
          </label>
          <ul className="todo-list">
            {/* <!-- These are here just to show the structure of the list items --> */}
            {/* <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
            {renderList.map((todo) => {
              return (
                <li
                  key={todo.id}
                  className={todo.completed ? 'completed' : 'view'}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => bloc.onToggleCompleted(todo)}
                    />
                    <label>{todo.description}</label>
                    <button
                      className="destroy"
                      onClick={() => bloc.onRemoveTodo(todo.id)}
                    ></button>
                  </div>
                  <input
                    className="edit"
                    value={todo.description}
                    onChange={(e) => {
                      bloc.onEditDescription(todo, e.target.value);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        {/* <!-- This footer should be hidden by default and shown when there are todos --> */}
        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count">
            <strong>{activeTodos.length}</strong> item left
          </span>
          {/* <!-- Remove this if you don't implement routing --> */}
          <ul className="filters">
            <li>
              <a className="selected" href="#/">
                All
              </a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          {/* <!-- Hidden if no completed items are left ↓ --> */}
          {completedTodos.length > 0 ? (
            <button
              className="clear-completed"
              onClick={() => bloc.removeAllCompletedTodos()}
            >
              Clear completed
            </button>
          ) : null}
        </footer>
      </section>
    </div>
  );
}

export default App;
