import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import * as actions from '../../../src/actions';
import reduce from '../../../src/reducers';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia, CardHeader, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Arrowup from 'material-ui-icons/ArrowUpward';
import Arrowdown from 'material-ui-icons/ArrowDownward';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

@connect(reduce,actions)
export default class Home extends Component {

    componentDidMount() {
        console.log(this.props)
        this.props.fetchRunbooks();
    }

	render() {
		return (
            <div
                style={{
                    flexGrow: 1,
                    paddingTop: 55,
                    direction:'row',
                    alignItems: 'flex-start',
                    justify: 'space-between',
                }}
            >
                <Grid container spacing={0}>
                    <Grid item xs>
                        <Card style={{width:'100%', textAlign:'left'}}>
                                <CardHeader
                                    avatar={
                                        <CardMedia
                                            style={{width: 80, height: 80, marginTop: '0%', marginLeft: '0%',}}
                                            image="https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif"
                                            title="Live from space album cover"
                                        />
                                    }
                                    title="How to make your Pug fly!"
                                    subheader="Ever wondered how to make a pug fly?"
                                />
                            <CardContent>
                                <Typography component="p">
                                    Submitted 1 day ago by /u/pugbuddy234
                                </Typography>
                            </CardContent>
                            <div>
                                <CardActions style={{width:'100%'}}>
                                    <Button size="small" style={{marginLeft: '2%', position:'absolute'}} >
                                        0 Comments
                                    </Button>
                                    <a style={{width:'100%'}}/>
                                    <IconButton size="small">
                                        <Arrowup/>
                                    </IconButton>
                                    <a>0</a>
                                    <IconButton size="small" style={{marginRight: '2%'}}>
                                        <Arrowdown/>
                                    </IconButton>
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>
				</Grid>
			</div>

		);
	}
}
