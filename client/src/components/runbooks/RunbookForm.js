import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import RunbookField from './RunbookField';
import RunbookFieldArray from './RunbookFieldArray';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import formFields from './formFields';
import Button from 'material-ui/Button';
import { blue } from 'material-ui/colors';
const primary = blue[500];

class RunbookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectives: [],
      tasks: [],
      checked: [0],
      objectiveTasks: [],
      objectiveTaskCounter: 0,
      objectiveItemCounter: 0,
      objectiveTaskItemCounter: 0,
      taskItemCounter: 0,
      objectiveTitle: '',
      taskTitle: '',
      objectiveContent: [],
      expandObjectiveState: false,
    };
    this.handleChangeObjective = this.handleChangeObjective.bind(this);
    this.handleChangeTask = this.handleChangeTask.bind(this);
  }

  // Function for expanding 'objectives' onClick
  // Changes the 'expanded' value for an objective to the opposite value
  handleExpandObjectiveClick(objectiveIndex) {
    let prevObjectives = this.state.objectives;
    prevObjectives[objectiveIndex].expanded = !prevObjectives[objectiveIndex]
      .expanded;
    this.setState({
      objectives: prevObjectives,
    });
  }

  // Function for accepting 'enter' key pressed for adding Objectives
  // Prevent default should prevent console errors when nothing is submitted
  objectiveEnter(e) {
    if (e.key === 'Enter') {
      this.addObjective(
        this.state.objectiveTitle,
        this.state.objectiveItemCounter,
      );
      this.setState({
        objectiveTitle: '',
      });
      e.preventDefault();
    }
  }

  // Function for accepting 'enter' key pressed for adding Tasks
  // User will not need to manually press + button to add a task
  // After Task is submitted to 'state', clear 'task' Textfield value to blank
  // Prevent default should prevent console errors when nothing is submitted
  taskEnter(objectiveIndex, e) {
    if (e.key === 'Enter') {
      this.addTask(objectiveIndex);
      this.setState({
        taskTitle: '',
      });
      e.preventDefault();
    }
  }

  // Function that updates the 'objectiveTitle' state values using 'onChange' event
  handleChangeObjective(event) {
    this.setState({ objectiveTitle: event.target.value });
  }

  // Function that updates the 'taskTitle' state values using 'onChange' event
  handleChangeTask(event) {
    this.setState({ taskTitle: event.target.value });
  }

  // Function renders fields of form taken from 'formFields' file
  // Uses 'lodash' to create an empty array to map using the 'formFields' lines in file; takes the 'label' and 'name' values
  // 'key' is required to make all <div>'s unique
  // 'Grid' is used for layout
  // 'Field' is from 'redux-form' to help with managing Forms, uses component RunbookField to input validation
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <div
          key={name}
          style={{
            marginTop: 12,
            padding: 0,
            justify: 'center',
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Field
                component={RunbookField}
                type="text"
                label={label}
                name={name}
              />
            </Grid>
          </Grid>
        </div>
      );
    });
  }

  // Function to remove an Objective in 'objective' state at a specific Index in state
  // Arguments is 'objectiveIndex' which is the position of where in the array user would like to remove
  removeObjective(objectiveIndex) {
    // Get static state of 'objectives'
    let prevObjectives = this.state.objectives;

    // Counter is used to start the positioning
    let thisCounter = 0;

    // Use map to go through all existing objectives matching the given 'objectiveIndex'
    // If there is a match, use 'splice' to remove element in prevObjectives array
    prevObjectives.map(obj => {
      if (obj.index === objectiveIndex) {
        prevObjectives.splice(thisCounter, 1);

        // Append a new state to Objectives with the modified array state
        this.setState({
          objectives: prevObjectives,
        });
      }
      // If given objectiveIndex does not match this obj.index, increase counter by 1
      thisCounter = thisCounter + 1;

      // 'return' to prevent error 'Expected to return a value in arrow function  array-callback-return'
        return prevObjectives
    });
  }

  // Function to add a task to an 'objective' state at a specific index
  // Arguments is 'objectiveIndex' which is used to get the position where in the array user would like to add a task
  addTask(objectiveIndex) {
    // Get static state of 'objectives'
    const prevObjectives = this.state.objectives;
    // Append 'title' element to 'tasks' for the objective
    prevObjectives[objectiveIndex].tasks.push({
      title: this.state.taskTitle,
    });
    // Append a new state to Objectives with the modified array state
    this.setState({
      objectives: prevObjectives,
    });
  }

  // Adding Objective to New Runbook
  addObjective(objectiveTitle, objectiveIndex) {
    // Get Previous Objective State which should start as an empty array '[]'
    const prevObjectives = this.state.objectives;

    // Function tasks in arguments to be pushed to array
    // Creating an empty 'tasks' array so elements can be added
    // 'expanded' determines if the objective expands to show 'tasks'
    prevObjectives.push({
      title: objectiveTitle,
      index: objectiveIndex,
      tasks: [],
      expanded: false,
    });

    // Set the State of current page of objectives
    // Increase the ObjectiveItemCounter so that it can create an index for additional objective positioning
    // Reset the objectiveTitle to blank so the previous entry does not show
    this.setState({
      objectives: prevObjectives,
      objectiveItemCounter: this.state.objectiveItemCounter + 1,
      objectiveTitle: '',
    });

    // Now after the user clicks on 'Review' these values should be saved temporarily
    // After reviewing the Form, the 'objectives' state should be sent to back-end as normal when creating runbook
    // When user clicks on 'Review', the state should be appended temporary in redux
  }

    render() {

        return (
      <div>
          {/* Action when Form is submitted, use redux function */}
        <form onSubmit={this.props.handleSubmit(this.props.onRunbookSubmit)}>
          {this.renderFields()}
            <FieldArray name="objectives" component={RunbookFieldArray} />

          <div
            style={{
              marginTop: 0,
              padding: 0,
              justify: 'center',
            }}
          >
            <Grid container spacing={0}>
              <Grid
                item
                xs={8}
                style={{
                  marginLeft: '2%',
                  paddingTop: '10%',
                  paddingBottom: '30%',
                }}
              >
                <Link to="/runbooks" className="red left btn-flat white-text">
                  Cancel
                </Link>
              </Grid>

              <Grid
                item
                xs
                style={{
                  marginRight: '2%',
                  paddingTop: '10%',
                  paddingBottom: '30%',
                }}
              >
                <Button
                  type="submit"
                  style={{ background: primary }}
                  className="right btn-flat white-text"
                >
                  Review
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    );
  }
}

// Function for validating errors in input fields
function validate(values) {
  const errors = {};

  // Use 'lodash' to create an empty; fill it according to the lines in 'formFields' file, get 'name' values
  _.each(formFields, ({ name }) => {
    // Logic: if there are no values in 'name', create an error for 'name'
    if (!values[name]) {
      errors[name] = 'This field cannot be empty';
    }
  });
  return errors;
}

// Redux-Form setup
export default reduxForm({
  validate,
  form: 'runbookForm',
    // Disable destroying redux data on unmount(changes pages/links) so that it can be saved when user goes 'back'
  destroyOnUnmount: false,
})(RunbookForm);
