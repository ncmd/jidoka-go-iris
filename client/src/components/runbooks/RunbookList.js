import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchRunbooks,
  upvoteRunbook,
  downvoteRunbook,
  fetchRunbookComments,
  fetchSearchRunbook,
  sortRunbooksSumvotes,
  selectRunbook,
  commentRunbook,
} from '../../actions';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import FSelect from 'material-ui/Select';
import Select from 'react-select';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import { blue } from 'material-ui/colors';
const primary = blue[500];
TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

class RunbookList extends Component {
  constructor(props) {
    super(props);
    this.sortHandleChange = this.sortHandleChange.bind(this);
    this.searchHandleChange = this.searchHandleChange.bind(this);
    this.state = {
      commentsButtonClicked: false,
      selectedRunbookId: '',
      userComment: '',
      loadComments: false,
      selectedRunbook: '',
      searchValue: '',
      searchOptions: [],
      sortValue: [],
      runbookOptions: [],
    };
  }

  componentDidMount() {

    this.props.fetchRunbooks().then(() => {
      let prevSearchOptions = this.state.searchOptions;
      this.props.runbooks.map(rb => {
        prevSearchOptions.push({
          label: rb.title,
          value: rb.id,
        });
        this.setState({
          searchOptions: prevSearchOptions,
        });
        return null
      });
    });
  }

  selectRunbookFunc(index, runbookId) {
    this.props.selectRunbook(index, runbookId);
    this.props.fetchRunbookComments(runbookId);
  }

  searchHandleChange(searchValue) {
    this.setState({ searchValue });
    console.log('You Selected:', searchValue);
    let counter = 0;
    if (searchValue !== null && searchValue.length===0 ) {
      this.props.fetchRunbooks();
      counter = 0;
    } else {
        this.props.fetchRunbooks();
    }
    this.state.searchOptions.map(options => {
      if (options.value === searchValue) {
        //  Now change redux to only show the searchValue Runbook
        // this.selectRunbookFunc(index, searchValue);
        // console.log(this.props);
        this.props.fetchSearchRunbook(searchValue);
        console.log(this.props);

        console.log('Match:', options.value, 'Counter:', counter);
      }

      counter = counter + 1;

      return null
    });
  }

  sortHandleChange(sortValue) {
    console.log('SORT VALUE:', sortValue.target.value);
    this.props.sortRunbooksSumvotes(sortValue.target.value);
    this.setState({
      sortValue: sortValue.target.value,
    });
  }

  renderSearch() {
    const { stayOpen } = this.state;
    const options = this.state.searchOptions;
    return (
      <div align="left">
        <Select
          closeOnSelect={!stayOpen}
          onChange={this.searchHandleChange}
          options={options}
          placeholder="Search by Runbook Title"
          removeSelected={this.state.removeSelected}
          rtl={false}
          simpleValue
          value={this.state.searchValue}
          style={{
            marginLeft: '2%',
            marginRight: '2%',
            marginTop: 25,
            width: '96%',
          }}
        />
      </div>
    );
  }

  renderSorter() {
    return (
      <div>
        <FormControl
          style={{
            marginTop: 12,
            width: '98%',
            marginRight: '2%',
          }}
        >
          <InputLabel htmlFor="sort-helper">Sort by</InputLabel>
          <FSelect
            value={this.state.sortValue}
            onChange={this.sortHandleChange}
            input={<Input id="sort-helper" />}
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="votes">Votes</MenuItem>
            <MenuItem value="views">Views</MenuItem>
            <MenuItem value="commentz">Comments</MenuItem>
          </FSelect>
        </FormControl>
      </div>
    );
  }

  shouldComponentUpdate(nextState) {
    if (this.state.searchOptions !== nextState.searchOptions) {
      return true;
    }
  }

  renderRunbooks() {
    return this.props.runbooks.map(runbook => {
      return (
        <div className="card darken-1 horizontal" key={runbook.id}>
          <div
            className="card-image"
            style={{
              position: 'absolute',
              width: 70,
              height: 70,
              marginTop: 8,
              marginLeft: 8,
            }}
          >
            <img src={runbook.image} alt={runbook.description} />
          </div>
          <div className="card-stacked">
            <div
              className="card-content"
              style={{ marginLeft: 60, marginTop: -15 }}
            >
              <span
              >
                <Link to={{ pathname: '/runbooks/' + runbook.id + '/details' }}>
                  <Typography style={{ color: primary }}>
                    {runbook.title}
                  </Typography>
                </Link>
              </span>
              <p>
                <Typography type="caption"> {runbook.description}</Typography>
              </p>
              <p className="left">
                <Typography type="caption">
                    {'Submitted'}{' '}{timeAgo.format(new Date(runbook.dateCreated))}
                </Typography>
              </p>
            </div>
            <div className="card-action" style={{ height: 40 }}>
              <div style={{ marginRight:0 }}>
                <span
                  onClick={() =>
                    this.selectRunbookFunc(runbook.index, runbook.id)
                  }
                >
                  <Link
                    to={{ pathname: '/runbooks/' + runbook.id + '/details' }}
                  >
                    <Typography
                      style={{ marginTop: -5, color: 'grey' }}
                      className="left"
                      type="button"
                    >
                      {runbook.comments} Comments
                    </Typography>
                  </Link>
                </span>
                <a
                  onClick={() =>
                    this.props.downvoteRunbook(
                      runbook.id,
                      'downvote',
                      runbook.index,
                    )
                  }
                  className="right"
                  style={{ marginTop: -8 }}
                >
                  <i className="material-icons" style={{ color: 'grey' }}>
                    arrow_downward
                  </i>
                </a>
                <a className="right" style={{ marginTop: -6, color: 'red' }}>
                  <Typography
                    style={{ marginTop: 0, color: 'grey' }}
                    className="left"
                    type="subheading"
                  >
                    {runbook.upvotes - runbook.downvotes}
                  </Typography>
                </a>
                <a
                  onClick={() =>
                    this.props.upvoteRunbook(
                      runbook.id,
                      'upvote',
                      runbook.index,
                    )
                  }
                  className="right"
                  style={{ marginTop: -8 }}
                >
                  <i className="material-icons" style={{ color: 'grey' }}>
                    arrow_upward
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div
        style={{
          flexGrow: 1,
          marginTop: 0,
          paddingBottom: '30%',
          justify: 'center',
        }}
      >
        <Grid container spacing={0}>
            <Grid item xs={12} sm={1}>
                {}
            </Grid>
                <Grid item xs={12} sm={4}>
                    {this.renderSearch()}
                </Grid>
            <Grid item xs={12} sm={4}>
                {}
            </Grid>
                <Grid item xs={12} sm={2}>
                    {this.renderSorter()}
                </Grid>
            <Grid item xs={12} sm={1}>
                {}
            </Grid>
            <Grid item xs={12} sm={1}>
                {}
            </Grid>
            <Grid item xs={12} sm={10}>
                {this.renderRunbooks()}
            </Grid>

            <Grid item xs={12} sm={1}>
                {}
            </Grid>

        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ runbooks }) {
  return { runbooks };
}

export default connect(mapStateToProps, {
  fetchRunbooks,
  fetchRunbookComments,
  fetchSearchRunbook,
  sortRunbooksSumvotes,
  upvoteRunbook,
  downvoteRunbook,
  selectRunbook,
  commentRunbook,
})(RunbookList);
