/* @flow */

export type RawTodo = {
  id: number,
  title: string,
  done: boolean
}

export default class Todo {
  _id: ?number
  title: string
  done: boolean
  _persistence: TodoPersistence

  get id(): ?number {
    return this._id;
  }

  constructor(persistence: TodoPersistence, data? : RawTodo) {
    const { id, title, done } = data || {
      id: null,
      title: '',
      done: false
    };
    this._id = id;
    this.title = title;
    this.done = done;
    this._persistence = persistence;
  }

  load(id: number): Promise<void> {
    return this._persistence.fetch(id)
      .then(todo => {
        this._id = todo.id;
        this.title = todo.title;
        this.done = todo.done;
      });
  }

  save(): Promise<void>  {
    if (this.id == null) {
      return this._persistence.create(this)
        .then(todo => {
          this._id = todo.id;
        });
    } else {
      return this._persistence.update(this)
        .then(todo => {
          // to void
        });
    }
  }

  remove(): Promise<void>  {
    return this._persistence.remove(this);
  }

}

export interface TodoPersistence {

  fetchAll(): Promise<RawTodo[]>;

  fetch(id: number): Promise<RawTodo>;

  create(todo: Todo): Promise<RawTodo>;

  update(todo: Todo): Promise<RawTodo>;

  remove(todo: Todo): Promise<void>;

}
