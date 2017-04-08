/* @flow */
import React from 'react';
import Navbar from '../Navbar/Navbar';
import TodoUsecase from '../../../usecase/TodoUsecase';

type Props = {
  usecase: TodoUsecase,
  children: React.Element<*>
};

export default class App extends React.Component {

  props: Props

  render() {
    const { usecase, children } = this.props;
    return (
      <div className="App">
        <Navbar />
        {React.cloneElement(children, {
          usecase
        })}
      </div>
    );
  }

}
