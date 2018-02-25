// Shows user their inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import List, {
    ListItem,
    ListItemText,
} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import ListSubheader from 'material-ui/List/ListSubheader';
import Button from 'material-ui/Button';

const RunbookEditFormReview = ({
                               onCancel,
                               formValues,
                                   updateRunbook,
                               history,
                           }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name} style={{ marginLeft: '2%' }}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    const reviewObjectives = (
        <div>
            {formValues.objectives.map((objective,index) => (
                <List subheader={<ListSubheader>Objective {index+1}</ListSubheader>}  key={objective.title+index}>
                    <div
                        style={{
                            padding: 0,
                            justify: 'center',
                        }}
                    >
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <ListItem dense button>
                                    <ListItemText
                                        primary={`${objective.title}`}
                                    />
                                </ListItem>
                                <List subheader={<ListSubheader>Tasks</ListSubheader>}>
                                    {objective.tasks.map((task,tindex) => (
                                        <ListItem dense button key={task.title+tindex}>
                                            <ListItemText primary={`${task.title}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                    </div>
                </List>
            ))}
        </div>
    );

    return (
        <div
            style={{
                padding: 0,
                justify: 'center',
            }}
        >
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <h5 style={{ marginLeft: '2%' }}> Review Runbook</h5>
                    {reviewFields}
                    {reviewObjectives}
                </Grid>
                <Grid item xs={8} style={{ marginLeft: '2%' }}>
                    <Button
                        className="red darken-3 white-text btn-flat"
                        onClick={onCancel}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs align="right" style={{ marginRight: '2%' }}>
                    {/* submitRunbook button executes the redux action in 'index.js' - submitRunbook */}
                    <Button
                        className="green white-text btn-flat"
                        onClick={() => updateRunbook(formValues.id, 0 ,formValues, history)}
                    >
                        Submit
                        <i className="material-icons" style={{ marginLeft: 5 }}>
                            email
                        </i>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

// Getting information from Redux store
function mapStateToProps(state) {
    // Here are the formValues for the redux-form
    // This is taken from 'RunbookForm' file created by the 'export default reduxForm'
    console.log('RUNBOOKFORMREVIEW STATE:', state);
    return {
        formValues: state.form.runbookEditForm.values,
    };
}

export default connect(mapStateToProps, actions)(withRouter(RunbookEditFormReview));
