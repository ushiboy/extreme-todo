/* @flow */
import Todo from '../domain/Todo';
import type { TodoPersistence, RawTodo } from '../domain/Todo';

export default class RemoveTodoPersistence implements TodoPersistence {

  fetchAll(): Promise<RawTodo[]> {
    return fetch('/api/todos')
      .then(res => res.json())
      .then(json => {
        return json.todos;
      });
  }

  fetch(id: number): Promise<RawTodo> {
    return fetch(`/api/todos/${id}`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('Not Found');
        }
      })
      .then(json => {
        return json.todo;
      });
  }

  create(todo: Todo): Promise<RawTodo> {
    const { title, done } = todo;
    return fetch(`/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          title, done
        })
      })
      .then(res => {
        return res.json()
      })
      .then(json => {
        return json.todo;
      });
  }

  update(todo: Todo): Promise<RawTodo> {
    const { id, title, done } = todo;
    if (id != null) {
      return fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            title, done
          })
        })
        .then(res => {
          return res.json()
        })
        .then(json => {
          return json.todo;
        });
    }
    return Promise.reject(new Error('Bad Parameter'));
  }

  remove(todo: Todo): Promise<void> {
    const { id, title, done } = todo;
    if (id != null) {
      return fetch(`/api/todos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
      }).then(res => {
        // void
      });
    }
    return Promise.reject(new Error('Bad Parameter'));
  }

}
