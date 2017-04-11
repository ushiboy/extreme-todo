/* @flow */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Todo from '../../../domain/Todo';
import TodoUsecase from '../../../usecase/TodoUsecase';


type Props = {
  usecase: TodoUsecase
};

type State = {
  todos: Todo[]
};

export default class TodoList extends React.Component {

  props: Props

  state: State

  constructor(props: Props) {
    super(props);
    const { usecase } = props;
    this.state = {
      todos: usecase.todos.items
    };
  }

  render() {
    const { todos } = this.state;
    const rows = todos.map(({ id, title }, index) => {
      if (id == null) {
        return null;
      }
      return (
        <tr key={index}>
          <td><Link to={`/todos/${id}/edit`}>{title}</Link></td>
        </tr>
      );
    });
    return (
      <div className="TodoList container">
        <div className="row control">
          <button className="btn btn-default" onClick={this.handleCreateClick}>Create</button>
        </div>
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  handleCreateClick() {
    browserHistory.push(`/todos/new`);
  }

}
