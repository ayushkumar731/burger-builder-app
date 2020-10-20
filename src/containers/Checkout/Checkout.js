import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';

class Checkout extends Component {

    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    checkeoutCancelledHandler=() => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler=() => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkeoutCancelled={this.checkeoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        )
    }
}

export default Checkout;