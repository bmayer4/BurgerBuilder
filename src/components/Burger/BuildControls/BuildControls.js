import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {

    const controls = [
        { label: 'Lettuce', type: 'lettuce' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Meat', type: 'meat' }
    ]

    return (
        <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {
            controls.map((ctrl) => {
                return <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label} 
                        addIngredient={() => {props.addIngredient(ctrl.type)}}  
                        removeIngredient={() => {props.removeIngredient(ctrl.type)}} 
                        disabled={props.disabled[ctrl.type]}
                        />
            })
        }
        <button 
        disabled={!props.purchaseable}
        className={classes.OrderButton} 
        onClick={props.ordered}>
        {props.isAuth ? 'Order Now' : 'Sign In To Order'}
        </button>
        </div>
    );
}

export default BuildControls;