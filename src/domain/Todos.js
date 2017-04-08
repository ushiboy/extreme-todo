/* @flow */
import Todo from './Todo';
import type { TodoPersistence } from './Todo';

export default class Todos {

  _persistence: TodoPersistence

  items: Todo[]

  constructor(persistence: TodoPersistence) {
    this.items = [];
    this._persistence = persistence
  }

  load(): Promise<void> {
    return this._persistence.fetchAll()
      .then(rawTodos => {
        this.items = rawTodos.map(t => {
          return new Todo(this._persistence, t);
        });
      });
  }

}
