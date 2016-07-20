import './Home.scss';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import * as actions from '../../actions/actions';

class Home extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.getEntries();
  }

  render () {
    return (
      <div className="Home">
        <Link to="/add" ><Button bsStyle='primary' className='button add'>Add Entry</Button></Link>
        <div>
          {this.props.entries.map((entry) =>
            <div key={entry._id}>
              <Link to={`/entry?id=${entry._id}`}><h4>{entry.name}</h4></Link>
              <p>{entry.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
