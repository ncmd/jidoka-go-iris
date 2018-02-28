import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import * as actions from '../../../src/actions';
import reduce from '../../../src/reducers';
import Grid from 'material-ui/Grid';
import Card, {
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Arrowup from 'material-ui-icons/ArrowUpward';
import Arrowdown from 'material-ui-icons/ArrowDownward';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');


@connect(reduce, actions)
export default class Home extends Component {
  componentDidMount() {
    this.props.fetchRunbooks();
    console.log(this.props);
  }

  renderRunbookList() {
    return this.props.runbooks.map(runbook => {
      return (
        <Card style={{ width: '100%', textAlign: 'left' }} key={runbook.id}>
          <CardHeader
            avatar={
              <CardMedia
                style={{
                  width: 80,
                  height: 80,
                  marginTop: '0%',
                  marginLeft: '0%',
                }}
                image={runbook.image}
              />
            }
            title={runbook.title}
            subheader={runbook.description}
          />
          <CardContent>
            <Typography component="p">
                {'Submitted'}{' '}{timeAgo.format(new Date(runbook.dateCreated))}
            </Typography>
          </CardContent>
          <div>
            <CardActions style={{ width: '100%' }}>
              <Button
                size="small"
                style={{ marginLeft: '2%', position: 'absolute' }}
              >
                  {runbook.comments} Comments
              </Button>
              <a style={{ width: '100%' }} />
              <IconButton size="small" onClick={() =>
                  this.props.upvoteRunbook(
                      runbook.id,
                      'upvote',
                      runbook.index,
                  )
              }>
                <Arrowup />
              </IconButton>
              <a>{runbook.upvotes - runbook.downvotes}</a>
              <IconButton size="small" style={{ marginRight: '2%' }} onClick={() =>
                  this.props.downvoteRunbook(
                      runbook.id,
                      'downvote',
                      runbook.index,
                  )
              }>
                <Arrowdown />
              </IconButton>
            </CardActions>
          </div>
        </Card>
      );
    });
  }

  render() {
    return (
      <div
        style={{
          flexGrow: 1,
          paddingTop: 55,
          direction: 'row',
          alignItems: 'flex-start',
          justify: 'space-between',
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={10}>
            {this.renderRunbookList()}
          </Grid>
        </Grid>
      </div>
    );
  }
}
