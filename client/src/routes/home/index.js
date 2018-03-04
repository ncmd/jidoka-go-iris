import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import reduce from '../../../src/reducers';
import * as actions from '../../../src/actions';
import Card, { CardHeader, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Upvote from 'material-ui-icons/ArrowUpward';
import Downvote from 'material-ui-icons/ArrowDownward';
import IconButton from 'material-ui/IconButton';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

@connect(reduce, actions)
export default class Home extends Component {
  componentDidMount() {
    this.props.fetchRunbooks().then(() => {
      console.log(this.props);
    });
  }

  renderRunbooks() {
    return this.props.runbooks.map(runbook => {
      return (
        <Card key={runbook.id} style={{ display: 'flex', marginTop: 2 }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <CardHeader
              avatar={
                <img
                  src={runbook.image}
                  alt={runbook.title}
                  style={{ width: 75, height: 75 }}
                />
              }
              title={runbook.title}
              subheader={runbook.description}
            />
            <CardActions>
              <Grid container style={{ flexGrow: 1 }}>
                <Grid item xs>
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="flex-start"
                    spacing={0}
                  >
                    <Grid item>
                      <Button>
                        <Typography>
                          {timeAgo.format(new Date(runbook.dateCreated))}
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    alignItems="flex-start"
                    direction="row"
                    justify="flex-end"
                    spacing={0}
                  >
                    <Grid item>
                      <IconButton>
                        <Upvote />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        {runbook.upvotes - runbook.downvotes}
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <Downvote />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
          marginTop: 70,
          justify: 'center',
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={2}>
            {}
          </Grid>
          <Grid item xs={12} sm={8}>
            {this.renderRunbooks()}
          </Grid>
          <Grid item xs={12} sm={2}>
            {}
          </Grid>
        </Grid>
      </div>
    );
  }
}
