import './Home.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

class Home extends Component {

  static propTypes = {
  };

  render () {
    // const { friendList: { friendsById }, actions } = this.props;

    return (
      <div className="Home">
        <h1>Startuply</h1>
        <div>
          <Link to="/add"><Button bsStyle='primary' className='button'>Add Entry</Button></Link>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
