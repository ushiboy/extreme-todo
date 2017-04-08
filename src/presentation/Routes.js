/* @flow */
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import TodoList from './pages/TodoList/TodoList';
import TodoForm from './pages/TodoForm/TodoForm';

export default function AppRoutes(props: {app: any}) {
  return (
    <Router history={browserHistory}>
      <Route component={props.app}>
        <Route path="/" component={TodoList} />
        <Route path="todos/new" component={TodoForm} />
        <Route path="todos/:id/edit" component={TodoForm} />
      </Route>
    </Router>
  );
}
