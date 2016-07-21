import './AddEntry.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EntryForm from '../../components/EntryForm/EntryForm.js';

import * as actions from '../../actions/actions';

class AddEntry extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
   constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit () {
    this.props.actions.addEntry()
    .then(() => {
      this.props.actions.changeRoute('/');
    });
  }

  change (name, value) {
    this.props.actions.changeForm(name, value);
  }

  render () {
    return (
      <div className="AddEntry">
        <h2>Add New Entry</h2>
        <div>
          <EntryForm change={this.change} submit={this.submit} formData={this.props.formData} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formData: state.formData,
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
)(AddEntry);
