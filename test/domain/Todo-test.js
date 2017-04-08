const assert = require('power-assert');
import Todo from '../../src/domain/Todo';
import LocalTodoPersistence from '../../src/infrastructure/LocalTodoPersistence';
import { assertEqualTodo } from '../helper';


describe('Todo', () => {

  const rows = [
    { id: 1, title: 'test 1', done: false }
  ];

  describe('#load()', () => {

    it('should fetch todo', () => {
      const persistence = new LocalTodoPersistence(rows);
      const todo = new Todo(persistence);
      return todo.load(1).then(() => {
        assertEqualTodo(todo, rows[0]);
      });
    });

  });

  describe('#save()', () => {

    it('should create todo when id is null', () => {
      const persistence = new LocalTodoPersistence();
      const todo = new Todo(persistence);
      const title = 'new';
      const done = true;
      todo.title = title;
      todo.done = done;
      return todo.save().then(() => {
        assert(todo.id === 1);
        assert(todo.title === title);
        assert(todo.done === done);
      });
    });

    it('should update todo when id is not null', () => {
      const persistence = new LocalTodoPersistence(rows);
      const todo = new Todo(persistence, rows[0]);
      const title = 'edit';
      const done = true;
      todo.title = title;
      todo.done = done;
      return todo.save().then(() => {
        assert(todo.id === 1);
        assert(todo.title === title);
        assert(todo.done === done);
      });
    });

  });

  describe('#remove()', () => {

    it('should remove todo', () => {
      const persistence = new LocalTodoPersistence(rows);
      const todo = new Todo(persistence, rows[0]);
      return todo.remove().then(() => {
        assert(persistence.has(1) === false);
      });
    });

  });

});
