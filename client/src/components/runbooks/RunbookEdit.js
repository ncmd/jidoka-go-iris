// RunbookNew shows RunbookForm
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import RunbookEditForm from './RunbookEditForm';
import RunbookEditFormReview from './RunbookEditFormReview';

// Controls the rendering of RunbookForm & RunbookFormReview
class RunbookEdit extends Component {

    // ES6 syntax for state
    state = { showFormReview: false };

    // Render function to determine which file to render
    renderContent() {
        if (this.state.showFormReview) {
            return (
                <RunbookEditFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }

        return (
            <RunbookEditForm
                onRunbookSubmit={() => this.setState({ showFormReview: true })}
            />
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: 'runbookEditForm',
})(RunbookEdit);
