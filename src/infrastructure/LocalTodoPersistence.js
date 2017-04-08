/* @flow */
import Todo from '../domain/Todo';
import type { TodoPersistence, RawTodo } from '../domain/Todo';

export default class LocalTodoPersistence implements TodoPersistence {

  _items: Map<number, RawTodo>
  _idSeed: number

  constructor(items?: RawTodo[]) {
    this._items = new Map();
    let idSeed = 0;
    if (items) {
      items.forEach((r, i) => {
        this._items.set(i + 1, r);
        idSeed = Math.max(r.id, idSeed);
      });
    }
    this._idSeed = idSeed + 1;
  }

  fetchAll(): Promise<RawTodo[]> {
    const result = [];
    this._items.forEach(r => {
      result.push(r);
    });
    return Promise.resolve(result);
  }

  fetch(id: number): Promise<RawTodo> {
    const r = this._items.get(id);
    if (r) {
      return Promise.resolve(r);
    }
    return Promise.reject(new Error('Not Found'));
  }

  create(todo: Todo): Promise<RawTodo> {
    const { title, done } = todo;
    const id = this._idSeed++;
    const r = { id, title, done };
    this._items.set(id, r);
    return Promise.resolve(r);
  }

  update(todo: Todo): Promise<RawTodo> {
    const { id, title, done } = todo;
    if (id) {
      const r = { id, title, done };
      return this.fetch(id).then(() => {
        this._items.set(id, r);
        return r;
      });
    }
    return Promise.reject(new Error('Bad Parameter'));
  }

  remove(todo: Todo): Promise<void> {
    const { id } = todo;
    if (id) {
      this._items.delete(id);
    }
    return Promise.resolve();
  }

  /**
   * for debug
   */
  has(id: number): boolean {
    return this._items.has(id);
  }

}
