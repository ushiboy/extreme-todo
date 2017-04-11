/* @flow */
import EventEmitter from 'events';
import Todo from '../domain/Todo';
import Todos from '../domain/Todos';
import type { TodoPersistence, RawTodo } from '../domain/Todo';


export type InitialData = {
  todos: {
    items: RawTodo[]
  },
  currentTodo: ?RawTodo
}

export default class TodoUsecase extends EventEmitter {

  todos: Todos
  currentTodo: Todo
  _persistence: TodoPersistence

  constructor(persistence: TodoPersistence, initialData: ?InitialData) {
    super();
    this.todos = new Todos(persistence, initialData && initialData.todos.items);
    this.currentTodo = new Todo(persistence);
    this._persistence = persistence;
  }

  loadTodos() {
    this.todos.load().then(() => {
      this.emit('todos/change');
    });
  }

  createNewTodoAndSetItToCurrent() {
    this.currentTodo = new Todo(this._persistence);
    this.currentTodo.title = 'New Todo';
    this.emit('currentTodo/change');
  }

  loadCurrentTodo(id: number) {
    this.currentTodo = new Todo(this._persistence);
    this.currentTodo.load(id).then(() => {
      this.emit('currentTodo/change');
    });
  }

  saveCurrentTodo(title: string, done: boolean) {
    this.currentTodo.title = title;
    this.currentTodo.done = done;
    this.currentTodo.save().then(() => {
      this.emit('currentTodo/save');
    });
  }

  removeCurrentTodo() {
    this.currentTodo.remove().then(() => {
      this.emit('currentTodo/remove');
    });
  }

  toJSON() {
    return {
      todos: this.todos,
      currentTodo: this.currentTodo
    };
  }

}
