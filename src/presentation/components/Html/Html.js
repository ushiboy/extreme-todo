/* @flow */
import React from 'react';
import { renderToString } from 'react-dom/server';
import TodoUsecase from '../../../usecase/TodoUsecase';

export default class Html extends React.Component {

  render() {
    const { children, usecase } = this.props;
    const content = children ? renderToString(children) : '';
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Extreme Todo</title>
          <link rel="stylesheet" href="/bundle.css" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: content}} />
          <script type="text/plain" id="initial-data" data-json={JSON.stringify(usecase)}></script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    );
  }

}
