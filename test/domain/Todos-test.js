const assert = require('power-assert');
import Todos from '../../src/domain/Todos';
import LocalTodoPersistence from '../../src/infrastructure/LocalTodoPersistence';
import { assertEqualTodo } from '../helper';


describe('Todos', () => {

  const rows = [
    { id: 1, title: 'test 1', done: false },
    { id: 2, title: 'test 2', done: true  },
    { id: 3, title: 'test 3', done: false }
  ];

  describe('#load()', () => {

    it('should fetch all todos', () => {
      const persistence = new LocalTodoPersistence(rows);
      const todos = new Todos(persistence);
      return todos.load().then(() => {
        const { items } = todos;
        assert(items.length === rows.length);
        assertEqualTodo(items[0], rows[0]);
        assertEqualTodo(items[1], rows[1]);
        assertEqualTodo(items[2], rows[2]);
      });
    });

  });

});
