import './Entry.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';

import * as actions from '../../actions/actions';

class Entry extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete(id) {
    this.props.actions.deleteEntry(id)
    .then(() => this.props.actions.changeRoute('/'));
  }

  render () {
    return (
      <div className="Box">
        <h2>{this.props.entry.name}</h2>

        <a className="delete" onClick={() => this.delete(this.props.entry._id)}> Delete</a>
        <p>{this.props.entry.description}</p>
        {this.props.entry.industry !== undefined ?
          <p><strong>Industry:</strong> {this.props.entry.industry}</p> : ''}
        {this.props.entry.size !== undefined ?
          <p><strong>Size:</strong> {this.props.entry.size} employees</p> : ''}
        {this.props.entry.funding !== undefined ?
          <p><strong>Funding:</strong> {this.props.entry.funding} million</p> : ''}
        {this.props.entry.founders !== undefined ?
          <p><strong>Founders:</strong> {this.props.entry.founders}</p> : ''}
        {this.props.entry.starred !== undefined ?
          <p><strong>Starred:</strong> {this.props.entry.starred}</p> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    entry: find(state.entries, {_id:state.router.location.query.id}),
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
)(Entry);
