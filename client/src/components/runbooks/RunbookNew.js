// RunbookNew shows RunbookForm
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import RunbookForm from './RunbookForm';
import RunbookFormReview from './RunbookFormReview';

// Controls the rendering of RunbookForm & RunbookFormReview
class RunbookNew extends Component {

    // ES6 syntax for state
    state = { showFormReview: false };

    // Render function to determine which file to render
    renderContent() {
        if (this.state.showFormReview) {
            return (
                <RunbookFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }

        return (
            <RunbookForm
                onRunbookSubmit={() => this.setState({ showFormReview: true })}
            />
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: 'runbookForm',
})(RunbookNew);
