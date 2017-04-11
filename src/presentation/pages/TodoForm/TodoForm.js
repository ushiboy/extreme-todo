/* @flow */
import React from 'react';
import { browserHistory } from 'react-router';
import TodoUsecase from '../../../usecase/TodoUsecase';

type Props = {
  usecase: TodoUsecase,
  params: {
    id: string
  }
};

type State = {
  title: string,
  done: boolean
};

export default class TodoForm extends React.Component {

  props: Props
  state: State
  handleSubmit: (e: Event) => void
  handleTitleChange: (e: any) => void
  handleDoneChange: (e: any) => void
  handleRemoveClick: (e: any) => void
  handleCancelClick: (e: any) => void
  handleCurrentTodoChange: () => void
  handleCurrentTodoSave: () => void
  handleCurrentTodoRemove: () => void

  constructor(props: Props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDoneChange = this.handleDoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCurrentTodoChange = this.handleCurrentTodoChange.bind(this);
    this.handleCurrentTodoSave = this.handleCurrentTodoSave.bind(this);
    this.handleCurrentTodoRemove = this.handleCurrentTodoRemove.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);

    const { usecase } = props;
    const { title, done } = usecase.currentTodo || { title: '', done: false };
    this.state = {
      title,
      done
    };
    usecase.on('currentTodo/change', this.handleCurrentTodoChange);
    usecase.on('currentTodo/save', this.handleCurrentTodoSave);
    usecase.on('currentTodo/remove', this.handleCurrentTodoRemove);
  }

  componentDidMount() {
    //const { id } = this.props.params;
    //if (id == null) {
    //  this.props.usecase.createNewTodoAndSetItToCurrent();
    //} else {
    //  this.props.usecase.loadCurrentTodo(Number(id));
    //}
  }

  componentWillUnmount() {
    const { usecase } = this.props;
    usecase.removeListener('currentTodo/change', this.handleCurrentTodoChange);
    usecase.removeListener('currentTodo/save', this.handleCurrentTodoSave);
    usecase.removeListener('currentTodo/remove', this.handleCurrentTodoRemove);
  }

  render() {
    const { title, done } = this.state;
    return (
      <div className="TodoForm container">
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <textarea className="form-control text-title"
                id="title" value={title} onChange={this.handleTitleChange} />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={done} onChange={this.handleDoneChange} /> Done
              </label>
            </div>
            <div className="control">
              <button type="submit" className="btn btn-success">Save</button>
              <button type="button" className="btn btn-danger" onClick={this.handleRemoveClick}>Remove</button>
              <button type="button" className="btn btn-default"
                onClick={this.handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleCurrentTodoChange() {
    const { currentTodo } = this.props.usecase;
    if (currentTodo) {
      const { title, done } = currentTodo;
      this.setState({ title, done });
    }
  }

  handleCurrentTodoSave() {
    browserHistory.push(`/`);
  }

  handleCurrentTodoRemove() {
    browserHistory.push(`/`);
  }

  handleTitleChange(e: any) {
    const { value } = e.target;
    this.setState({
      title: value
    });
  }

  handleDoneChange(e: any) {
    const { checked } = e.target;
    this.setState({
      done: checked
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const { title, done } = this.state;
    this.props.usecase.saveCurrentTodo(title, done);
  }

  handleRemoveClick(e: any) {
    if (window.confirm('Remove Ok ?')) {
      this.props.usecase.removeCurrentTodo();
    }
  }

  handleCancelClick(e: any) {
    browserHistory.push(`/`);
  }

}
