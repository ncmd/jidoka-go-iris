import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect } from 'react-redux';
import * as actions from '../actions';
import Button from 'material-ui/Button';

class Payments extends Component{
    render(){
        // debugger;
        // token={token=> console.log(token)}
        // token={token=> this.props.handleToken(token)}
        return(
            <StripeCheckout
                name="Jidoka"
                description="$5 for 5 credits"
                amount={500}
                token={token=> this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <Button className="btn">Add Credits</Button>
            </StripeCheckout>

        )
    }

}

export default connect(null, actions)(Payments);