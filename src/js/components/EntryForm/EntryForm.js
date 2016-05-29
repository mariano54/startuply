import './EntryForm.scss';
import { FormGroup, ControlLabel, FormControl,
   Checkbox, Button } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';

export default class EntryForm extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }
  change (e) {
    this.props.change(e.target.name, e.target.value);
  }

  render () {
    return (
      <form>
        <FormGroup controlId="formControlsText">
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text" name="name" placeholder="Enter name" onChange={this.change} />
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Industry</ControlLabel>
          <FormControl componentClass="select" placeholder="select" name="industry" onChange={this.change}>
            <option value="ai">Artificial Intelligence</option>
            <option value="education">Education</option>
            <option value="finance">Finance / Fintech</option>
            <option value="biotech">Biotech / Healthcare</option>
            <option value="social">Social Media</option>
            <option value="leisure">Leisure</option>
            <option value="entertainment">Entertainment</option>
            <option value="hardware">Hardware</option>
            <option value="other">Other</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Description / Notes</ControlLabel>
          <FormControl
            componentClass="textarea" placeholder="What is interesting about it"
            name="description" onChange={this.change} />
        </FormGroup>
        <FormGroup controlId="formControlsText">
          <ControlLabel>Size</ControlLabel>
          <FormControl type="text" name="size" placeholder="Size of company" onChange={this.change} />
        </FormGroup>
        <FormGroup controlId="formControlsText">
          <ControlLabel>Funding</ControlLabel>
          <FormControl type="text" name="funding" placeholder="Amount of funding raised (MM)" onChange={this.change} />
        </FormGroup>
        <FormGroup controlId="formControlsText">
          <ControlLabel>Founders / employees</ControlLabel>
          <FormControl type="text" name="founders" placeholder="Who are the people involved	?" onChange={this.change} />
        </FormGroup>

        <Checkbox name="star" onChange={this.change}>
          Star
        </Checkbox>

        <Button bsStyle="primary" onClick={this.props.submit}>
          Submit
        </Button>
      </form>
    );
  }
}
