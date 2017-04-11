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
        usecase.once('todos/change', () => {
          callback();
        });
        usecase.loadTodos();
      }}/>
      <Route path="todos/new" component={TodoForm} onEnter={(nextState, replace, callback) => {
        usecase.once('currentTodo/change', () => {
          callback();
        });
        usecase.createNewTodoAndSetItToCurrent();
      }} />
      <Route path="todos/:id/edit" component={TodoForm} onEnter={(nextState, replace, callback) => {
        const { id } = nextState.params;
        usecase.once('currentTodo/change', () => {
          callback();
        });
        usecase.loadCurrentTodo(Number(id));
      }} />
    </Route>
  );
}
