const assert = require('power-assert');
import TodoUsecase from '../../src/usecase/TodoUsecase';
import LocalTodoPersistence from '../../src/infrastructure/LocalTodoPersistence';
import { assertEqualTodo } from '../helper';


describe('TodoUsecase', () => {

  const rows = [
    { id: 1, title: 'test 1', done: false },
    { id: 2, title: 'test 2', done: true  },
    { id: 3, title: 'test 3', done: false }
  ];

  describe('#loadTodos()', () => {

    it('should load todos and emit "todos/change"', (done) => {
      const persistence = new LocalTodoPersistence(rows);
      const usecase = new TodoUsecase(persistence);

      usecase.on('todos/change', () => {
        const { items } = usecase.todos;
        assert(items.length === rows.length);
        assertEqualTodo(items[0], rows[0]);
        assertEqualTodo(items[1], rows[1]);
        assertEqualTodo(items[2], rows[2]);
        done();
      });

      usecase.loadTodos();
    });

  });

  describe('#createNewTodoAndSetItToCurrent()', () => {

    it('should create new todo and emit "currentTodo/change"', (done) => {
      const persistence = new LocalTodoPersistence();
      const usecase = new TodoUsecase(persistence);

      usecase.on('currentTodo/change', () => {
        assertEqualTodo(usecase.currentTodo, { id: null, title: 'New Todo', done: false });
        done();
      });

      usecase.createNewTodoAndSetItToCurrent();
    });

  });

  describe('#loadCurrentTodo()', () => {

    it('should load todo and emit "currentTodo/change"', (done) => {
      const persistence = new LocalTodoPersistence(rows);
      const usecase = new TodoUsecase(persistence);

      usecase.on('currentTodo/change', () => {
        assertEqualTodo(usecase.currentTodo, rows[1]);
        done();
      });

      usecase.loadCurrentTodo(2);
    });

  });

  describe('#saveCurrentTodo()', () => {

    it('should save current todo and emit "currentTodo/save"', (done) => {
      const persistence = new LocalTodoPersistence();
      const usecase = new TodoUsecase(persistence);

      usecase.on('currentTodo/save', () => {
        assertEqualTodo(usecase.currentTodo, { id: 1, title: 'Test', done: true });
        done();
      });

      usecase.createNewTodoAndSetItToCurrent();
      usecase.saveCurrentTodo('Test', true);
    });

  });

  describe('#removeCurrentTodo()', () => {

    it('should remove current todo and emit "currentTodo/remove"', (done) => {
      const persistence = new LocalTodoPersistence(rows);
      const usecase = new TodoUsecase(persistence);

      usecase.on('currentTodo/remove', () => {
        assert(persistence.has(2) === false);
        done();
      });

      usecase.loadCurrentTodo(2);
      usecase.on('currentTodo/change', () => {
        usecase.removeCurrentTodo();
      });
    });

  });

});
