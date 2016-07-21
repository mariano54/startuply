import './Header.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class EntryForm extends Component {
  static propTypes = {
  };
  render () {
    return (
      <div className="Header">
        <Link to="/"><h1>Startuply</h1></Link>
      </div>
    );
  }
}
