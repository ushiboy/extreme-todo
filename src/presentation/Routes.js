/* @flow */
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App/App';
import TodoList from './pages/TodoList/TodoList';
import TodoForm from './pages/TodoForm/TodoForm';
import TodoUsecase from '../usecase/TodoUsecase';

export default function getRoutes(usecase: TodoUsecase) {
  return (
    <Route component={App}>
      <Route path="/" component={TodoList} onEnter={(nextState, replace, callback) => {
        usecase.loadTodos().then(() => {
          callback();
        });
      }}/>
      <Route path="todos/new" component={TodoForm} onEnter={(nextState, replace, callback) => {
        usecase.createNewTodoAndSetItToCurrent().then(() => {
          callback();
        });
      }} />
      <Route path="todos/:id/edit" component={TodoForm} onEnter={(nextState, replace, callback) => {
        const { id } = nextState.params;
        usecase.loadCurrentTodo(Number(id)).then(() => {
          callback();
        });
      }} />
    </Route>
  );
}
