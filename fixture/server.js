#!./node_modules/.bin/babel-node

const port = Number(process.env.PORT || '8181');

const express = require('express');
const bodyParser = require('body-parser');
import LocalTodoPersistence from '../src/infrastructure/LocalTodoPersistence';


const persistence = new LocalTodoPersistence([
  { id: 1, title: 'test 1', done: false },
  { id: 2, title: 'test 2', done: false },
  { id: 3, title: 'test 3', done: false }
]);

const app = express();
app.use(bodyParser());

app.get('/api/todos', (req, res) => {
  persistence.fetchAll().then(todos => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.write(JSON.stringify({
      todos
    }));
    res.end();
  });
});

app.post('/api/todos', (req, res) => {
  const { title, done } = req.body;
  persistence.create({ title, done }).then(todo => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.write(JSON.stringify({
      todo
    }));
    res.statusCode = 201;
    res.end();
  });
});

app.get('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  persistence.fetch(id).then(todo => {
    res.write(JSON.stringify({
      todo
    }));
    res.end();
  }).catch(() => {
    res.statusCode = 404;
    res.end();
  });
});

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  persistence.update({ id, title, done }).then(todo => {
    res.write(JSON.stringify({
      todo
    }));
    res.end();
  }).catch(() => {
    res.statusCode = 404;
    res.end();
  });
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  persistence.remove({ id }).then(() => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 204;
    res.end();
  });
});

app.listen(port);
