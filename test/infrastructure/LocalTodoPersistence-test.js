const assert = require('power-assert');
import Todo from '../../src/domain/Todo';
import LocalTodoPersistence from '../../src/infrastructure/LocalTodoPersistence';
import { assertEqualTodo } from '../helper';


describe('LocalTodoPersistence', () => {

  const rows = [
    { id: 1, title: 'test 1', done: false },
    { id: 2, title: 'test 2', done: true  },
    { id: 3, title: 'test 3', done: false }
  ];

  describe('#fetchAll()', () => {

    it('should fetch all todos', () => {
      const persistence = new LocalTodoPersistence(rows);
      return persistence.fetchAll().then(items => {
        assert(items.length === rows.length);
        assertEqualTodo(items[0], rows[0]);
        assertEqualTodo(items[1], rows[1]);
        assertEqualTodo(items[2], rows[2]);
      });
    });

  });

  describe('#fetch()', () => {

    it('should fetch todo', () => {
      const persistence = new LocalTodoPersistence(rows);
      return persistence.fetch(2).then(item => {
        assertEqualTodo(item, rows[1]);
      });
    });

  });

  describe('#create()', () => {

    it('should create todo', () => {
      const persistence = new LocalTodoPersistence();
      const title = 'Test';
      const done = true;
      const newTodo = new Todo(persistence, { title, done });
      return persistence.create(newTodo).then(item => {
        assertEqualTodo(item, { id: 1, title, done });
      });
    });

  });

  describe('#update()', () => {

    it('should update todo', () => {
      const persistence = new LocalTodoPersistence(rows);
      const title = 'Test';
      const done = true;
      const editedTodo = new Todo(persistence, rows[1]);
      editedTodo.title = title;
      editedTodo.done = done;
      return persistence.update(editedTodo).then(item => {
        assertEqualTodo(item, { id: 2, title, done });
      });
    });

  });

  describe('#remove()', () => {

    it('should update todo', () => {
      const persistence = new LocalTodoPersistence(rows);
      const editedTodo = new Todo(persistence, rows[1]);
      return persistence.remove(editedTodo).then(() => {
        assert(persistence.has(2) === false);
      });
    });

  });

});
