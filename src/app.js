/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import TodoUsecase from './usecase/TodoUsecase';
import { Router, match, browserHistory } from 'react-router';
import getRoutes from './presentation/Routes';

//import LocalTodoPersistence from './infrastructure/LocalTodoPersistence';
//const persistence = new LocalTodoPersistence([
//  { id: 1, title: 'test 1', done: false },
//  { id: 2, title: 'test 2', done: false },
//  { id: 3, title: 'test 3', done: false }
//]);

/**
 * web api mode
 *
 * [Usage]
 *   $ cd fixture
 *   $ yarn install
 *   $ ./server.js
 */
import RemoteTodoPersistence from './infrastructure/RemoteTodoPersistence';
const persistence = new RemoteTodoPersistence();

const el = document.querySelector('#initial-data');
const data = el ? el.getAttribute('data-json') : null;
const initialData = data ? JSON.parse(data) : null;
const usecase = new TodoUsecase(persistence, initialData);

const routes = getRoutes(usecase);
match({
  history: browserHistory,
  routes
}, (err, redirectLocation, props) => {
  ReactDOM.render(
    <Router {...props} createElement={(Component, props) => {
      return <Component usecase={usecase} {...props} />;
    }} />,
    document.getElementById('app')
  );
})
