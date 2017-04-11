/* @flow */
import Todo from './Todo';
import type { TodoPersistence, RawTodo } from './Todo';

export default class Todos {

  _persistence: TodoPersistence

  items: Todo[]

  constructor(persistence: TodoPersistence, items: ?RawTodo[]) {
    this.items = [];
    this._persistence = persistence
    if (items) {
      this.items = items.map(t => {
        return new Todo(this._persistence, t);
      });
    }
  }

  load(): Promise<void> {
    return this._persistence.fetchAll()
      .then(rawTodos => {
        this.items = rawTodos.map(t => {
          return new Todo(this._persistence, t);
        });
      });
  }

  toJSON() {
    return {
      items: this.items
    };
  }

}
