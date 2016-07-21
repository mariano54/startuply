import React, { Component, PropTypes } from 'react';
import Header from '../Header/Header';
import './App.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className="page-container">
        <Header />
        <div className="Container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
