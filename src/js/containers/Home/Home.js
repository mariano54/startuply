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
    page: PropTypes.number.isRequired,

  };
  constructor(props){
    super(props);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.actions.getEntries(0);
    this.props.actions.setPage(0);
  }
  previousPage() {
    this.props.actions.getEntries(this.props.page - 1);
    this.props.actions.setPage(this.props.page - 1);
  }
  nextPage() {
    this.props.actions.getEntries(this.props.page + 1);
    this.props.actions.setPage(this.props.page + 1);
  }
  render () {
    const prev = this.props.page == 0 ? '' : <span><a
      className="page" onClick={this.previousPage}>Previous page ({this.props.page})
    </a><span>&nbsp;&nbsp;</span></span>;
    const next = this.props.entries.length < 10 ? '' : <a
      className="page" onClick={this.nextPage}>Next page ({this.props.page + 2})
    </a>;
    return (
      <span className="Home">
        <Link to="/add" ><Button bsStyle='primary' className='button add'>Add Entry</Button></Link>
        <div>
          {this.props.entries.map((entry) =>
            <div key={entry._id}>
              <Link to={`/entry?id=${entry._id}`}><h4>{entry.name}</h4></Link>
              <p className="industry">{entry.industry}</p>
              <p>{entry.description}</p>
            </div>
          )}
          {prev}
          {next}
        </div>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entries,
    page: state.home,
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
