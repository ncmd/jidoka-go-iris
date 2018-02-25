// RunbookField  contains logic to render runbook input 147
import React from 'react';
import RunbookField from './RunbookField';
import { Field } from 'redux-form';
import Button from 'material-ui/Button';
import { blue, red } from 'material-ui/colors';
import Grid from 'material-ui/Grid';
import CloseIcon from 'material-ui-icons/Close';

const primary = blue[500];
const secondary = red[500];
const required = value => (value ? undefined : 'This field cannot be empty');

export default ({ fields, meta: { error, touched } }) => {

    return (
        <ul>
            <div
                style={{
                    marginTop: 12,
                    padding: 0,
                    justify: 'center',
                }}
            >
                <li style={{ marginLeft: '2%' }}>
                    <Button
                        style={{ background: primary, color: 'white' }}
                        type="button"
                        onClick={() => fields.push({})}
                    >
                        Add Task
                    </Button>
                </li>
                {fields.map((task, index) => (
                    <li style={{marginTop:'4%' }} key={index}>
                        <Grid container spacing={0}>
                            <Grid item xs={10} style={{marginLeft:'2%' }}>
                                <h6>Task #{index + 1}</h6>
                            </Grid>
                            <Grid item xs align='right' style={{ marginRight: '2%'}}>
                                <Button
                                    fab
                                    mini
                                    style={{ background: secondary, color: 'white' }}
                                    type="button"
                                    title="Remove Task"
                                    onClick={() => fields.remove(index)}
                                >
                                    <CloseIcon style={{ color: 'white' }} />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name={`${task}.title`}
                                    type="text"
                                    component={RunbookField}
                                    label="Task Title"
                                    validate={[required]}
                                />
                            </Grid>
                        </Grid>
                    </li>
                ))}
                {touched && error && <li className="error">{error}</li>}
            </div>
        </ul>
    );
};
