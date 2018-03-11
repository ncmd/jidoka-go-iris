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
import { connect } from 'react-redux';
import { load as loadRunbook } from '../../reducers/editRunbookReducer';
const primary = blue[500];

class RunbookEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentWillMount() {
    // Loading Runbook data upon mount (this is super confusing on how this works...)
    console.log('SELECTED DATA FOR EDIT:', this.props.selected[0]);
    let prevData = this.state.data;

    this.setState({
      data: prevData,
    });
  }

    handleInitialize() {
        const initData = this.props.selected[0];
        this.props.initialize(initData);
    }

  componentDidMount() {
      this.handleInitialize();

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

  render() {
    return (
      <div>
        {/* Action when Form is submitted, use redux function */}
        <form onSubmit={this.props.handleSubmit(this.props.onRunbookSubmit)}>
          {this.renderFields()}
          {/* Render Objective Fields and Button*/}
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

function mapStateToProps({ selected, state }) {
  return { selected, state };
}

// ------ Beginning of Initializing Data for Redux-Form
// This is the redux-form connector to our reducer. This allows us to 'load' initialize data into our redux-form
// Without this, I would not be able to add initialValue to our redux-form
RunbookEditForm = connect(mapStateToProps)(RunbookEditForm);

// You have to connect() to any reducers that you wish to connect to yourself
RunbookEditForm = connect(
  state => ({
    initialValues: state.editRunbookReducer.data, // pull initial values from 'editRunbookReducer' reducer
  }),
  { load: loadRunbook }, // bind account loading action creator. 'load' => 'this.props.load'

)(RunbookEditForm);
// ------ End of Initializing Data for for Redux-Form

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
export default reduxForm(
  {
    validate,
    form: 'runbookEditForm',
    // Disable destroying redux data on unmount(changes pages/links) so that it can be saved when user goes 'back'
    destroyOnUnmount: false,
  },
)(RunbookEditForm);
