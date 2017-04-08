/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './presentation/components/App/App';
import TodoUsecase from './usecase/TodoUsecase';
import Routes from './presentation/Routes';

import LocalTodoPersistence from './infrastructure/LocalTodoPersistence';
const persistence = new LocalTodoPersistence([
  { id: 1, title: 'test 1', done: false },
  { id: 2, title: 'test 2', done: false },
  { id: 3, title: 'test 3', done: false }
]);

/**
 * web api mode
 *
 * [Usage]
 *   $ cd fixture
 *   $ yarn install
 *   $ ./server.js
 */
//import RemoteTodoPersistence from './infrastructure/RemoteTodoPersistence';
//const persistence = new RemoteTodoPersistence();


const usecase = new TodoUsecase(persistence);

function Root(props) {
  return <App usecase={usecase} children={props.children} />;
}

ReactDOM.render(
  <Routes app={Root} />,
  document.getElementById('app')
);
