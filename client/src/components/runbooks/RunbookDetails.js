import React, { Component } from 'react';
import {
  selectRunbook,
  fetchRunbookComments,
  commentRunbook,
  addComment,
  delComment,
  expandRunbookObjective,
    loadRunbook,
} from '../../actions';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Button from 'material-ui/Button';
import { blue } from 'material-ui/colors';

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');
const primary = blue[500];

class RunbookDetails extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userComment: '',
    };
  }

    componentDidMount() {
      console.log(this.props.location);
        this.props.loadRunbook('/api'+this.props.location.pathname);
    }


  handleExpandObjectiveClick(objectiveIndex) {
    console.log("CLICKED");
      this.props.expandRunbookObjective(0, objectiveIndex);


  }

  renderSelectedRunbook() {
    if (this.props.selected[0] !== undefined && this.props.selected[0].objectives !== undefined) {
      return (
        <div className="card darken-1 horizontal">
          <div className="card-stacked">
            <div
              className="card-content"
              style={{ marginLeft: '0%', marginTop: -20 }}
            >
              <span>
                <Typography style={{ color: primary }} type="button">
                  {this.props.selected[0].title}
                </Typography>
              </span>
              <p>
                <Typography type="caption">
                  {' '}
                  {this.props.selected[0].description}
                </Typography>
              </p>
              <Typography type="caption">
                <p>Objectives:</p>
                <p>Tasks: </p>
                <p>Revisions: 0</p>
              </Typography>
            </div>
            <List style={{marginTop: -20}} subheader={<ListSubheader>Objectives</ListSubheader>}>
              {this.props.selected[0].objectives.map((objective,index) => (
                <div
                  key={objective.title+index}
                  style={{
                    padding: 0,
                    justify: 'center',
                  }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <ListItem
                        button
                        dense
                        onClick={this.handleExpandObjectiveClick.bind(this,index)}
                        style={{ marginLeft: '2%', marginRight: '4%' }}
                      >
                        <ListItemText primary={`${objective.title}`} />
                        {objective.expanded ? <ExpandLess /> : <ExpandMore />}
                        <ListItemSecondaryAction
                          style={{ marginRight: '1.6%' }}
                          className="right"
                        />
                      </ListItem>
                      <Collapse
                        component="li"
                        in={objective.expanded}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List dense disablePadding>
                          <Grid container spacing={0}>
                            {objective.tasks.map((task,tindex) => (
                              <Grid
                                item
                                xs={12}
                                style={{ marginLeft: '5%', marginRight: '5%' }}
                                key={task.title+tindex}
                              >
                                <ListItem
                                  button
                                  style={{ paddingTop: 0, paddingBottom: 0 }}
                                >
                                  <ListItemIcon>
                                    <Checkbox
                                      checked="true"
                                      tabIndex={-1}
                                      disableRipple
                                    />
                                  </ListItemIcon>

                                  <ListItemText inset primary={task.title} />
                                </ListItem>
                              </Grid>
                            ))}
                          </Grid>
                        </List>
                      </Collapse>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </List>
            <div className="card-action" >
                <Grid container spacing={0}>
                    <Grid
                        item
                        xs={6}
                    >
                        <Link
                            to={{ pathname: '/runbooks/' + this.props.selected[0].id + '/edit' } }
                        >
                            <Button
                                dense
                                className="left"
                                style={{ background: primary, color: 'white' }}
                            >
                                Edit
                            </Button>
                        </Link>
                    </Grid>
                    <Grid
                        item
                        xs
                    >
                        <Button
                            dense
                            className="right"
                            style={{ background: primary, color: 'white' }}
                        >
                            Run
                        </Button>
                    </Grid>

                </Grid>
            </div>
          </div>
        </div>
      );
    }
  }

  renderCreateComment() {
    return (
      <div>
        <TextField
          label="Comment"
          placeholder="Make a comment on this Runbook"
          multiline
          style={{ marginTop: -10, marginRight: '2%', marginLeft: '2%', width: '96%' }}
          margin="normal"
          value={this.state.userComment}
          onChange={this.handleChange}
        />
        <Button
          onClick={() => {
            this.props.commentRunbook(
              this.props.selected[0].id,
              this.state.userComment,
              this.props.selected[1],
            );
          }}
          dense
          className={'right'}
          style={{
            marginTop: 5,
            marginLeft: 15,
            background: primary,
            color: 'white',
            marginRight: 15,
          }}
        >
          Add Comment
        </Button>
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      userComment: event.target.value,
    });
  }

  renderSelectedComments() {
    console.log('PROPS:', this.props.selected);
    return this.props.comments.map((comment,cindex) => {
      return (
        <div className="card darken-1 horizontal" key={comment.id+comment.dateCreated+comment.comment+cindex}>
          <div className="card-stacked">
            <div
              className="card-content"
              style={{ marginLeft: 0, marginTop: -15 }}
            >
              <span  className="left">
                <Typography style={{ color: primary }}>
                  {timeAgo.format(new Date(comment.dateCreated),'twitter')}
                </Typography>
              </span>
              <br />
                <Typography type="caption">
              <p>{comment.comment}</p>
                </Typography>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSelectedRunbook()}
        {this.renderCreateComment()}
        {this.renderSelectedComments()}
      </div>
    );
  }
}

function mapStateToProps({ selected, comments }) {
  return { selected, comments };
}


export default connect(mapStateToProps, {
  selectRunbook,
  fetchRunbookComments,
  commentRunbook,
  addComment,
  delComment,
    loadRunbook,
  expandRunbookObjective,
})(withRouter(RunbookDetails));
