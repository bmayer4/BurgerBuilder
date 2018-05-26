import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from './../../UI/Button/Button';


class OrderSummary extends Component {
        //made it a class component just to add the method below to test are updating controlled by wrapping element Modal
    componentDidUpdate() {
        console.log('order summary is updating');
    }

    render() {
        const ingredientSummary = this.props.ingredients && Object.keys(this.props.ingredients).map((ing) => {
            return <li  key={ing}><span style={{ textTransform: 'capitalize' }}>{ing}</span>: {this.props.ingredients[ing]}</li>
        })

        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
            {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <p><strong>Total: ${this.props.totalPrice.toFixed(2)}</strong></p>
            <Button btnType={'Danger'} clicked={this.props.cancel}>Cancel</Button>
            <Button btnType={'Success'} clicked={this.props.continue}>Continue</Button>
        </Aux>
        );
    }

}

export default OrderSummary;