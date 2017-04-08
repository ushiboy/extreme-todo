/* @flow */
import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Extreme Todo</Link>
          </div>
        </div>
      </nav>
    );
  }

}
