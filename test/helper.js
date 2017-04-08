const assert = require('power-assert');

export function assertEqualTodo(todo, row) {
  assert(todo.id === row.id);
  assert(todo.title === row.title);
  assert(todo.done === row.done);
}
