import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RunbookList from './runbooks/RunbookList';
import { blue } from 'material-ui/colors';
import { connect } from 'react-redux';
const primary = blue[500];

class Runbooks extends Component {
  render() {
    return (
      <div>
        <div className="fixed-action-btn">
          <Link
            to="/runbooks/new"
            style={{ background: primary }}
            className="btn waves-effect waves-light btn-large"
            type="submit"
            name="action"
          >
            Create a Runbook
            <i className="material-icons right">send</i>
          </Link>
        </div>
        <RunbookList />
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Runbooks);
