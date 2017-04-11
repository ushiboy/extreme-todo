/* @flow */
import connect from 'connect';
import http from 'http';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Html from './presentation/components/Html/Html';
import getRoutes from './presentation/Routes';
import { match, RouterContext } from 'react-router';
import TodoUsecase from './usecase/TodoUsecase';
import RemoteTodoPersistence from './infrastructure/RemoteTodoPersistence';

export function createServer() {
  const app = connect();
  app.use((req, res, next) => {

    const persistence = new RemoteTodoPersistence('http://localhost:8181');
    const usecase = new TodoUsecase(persistence);

    match({
      routes: getRoutes(usecase),
      location: req.originalUrl
    }, (err, redirectLocation, props) => {

      if (err) {
        return res.status(500).write('Server Error').end();
      }
      if (redirectLocation) {
        return res.redirect(redirectLocation.pathname + redirectLocation.search);
      }
      if (!props) {
        return next();
      }

      res.write(`<!doctype html>${
        renderToStaticMarkup(
          <Html usecase={usecase}>
            <RouterContext {...props} createElement={(Component, props) => {
              return <Component usecase={usecase} {...props} />;
            }} />
          </Html>
        )
      }`);
      res.end();
    })
  });

  return http.createServer(app);
}
