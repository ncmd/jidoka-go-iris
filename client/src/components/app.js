import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
// import Landing from './Landing';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Dashboard from './Dashboard';
import Runbooks from './Runbooks';
import RunbookNew from './runbooks/RunbookNew';
import RunbookEdit from './runbooks/RunbookEdit';
import RunbookDetails from './runbooks/RunbookDetails';
import SurveyNew from './surveys/SurveyNew';
import About from './company/About';

class App extends Component {
  // componentDidMount() {
  //   this.props.fetchUser();
  // }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Runbooks} />
            <Route exact path="/runbooks" component={Runbooks} />
            <Route exact path="/runbooks/new" component={RunbookNew} />
            <Route
              exact
              path="/runbooks/:runbookId/details"
              component={RunbookDetails}
            />
            <Route
              exact
              path="/runbooks/:runbookId/edit"
              component={RunbookEdit}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
