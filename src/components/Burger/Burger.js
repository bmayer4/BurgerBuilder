import React from 'react';
import { withRouter } from 'react-router-dom';  //gives components not loaded through route access to history, location, match (match refers to nearest route match)

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let ingredientsArr = Object.keys(props.ingredients).map((ing) => {
        return [...Array(props.ingredients[ing])].map((_, i) => {    
            console.log('running');  //map is run once, once, twice, twice if ingredeients were 1 1 2 2
            return <BurgerIngredient key={ing + i} type={ing} />
        });
    }).reduce((sum, value) => { 
        return sum.concat(value);  //pushing 4 arrays of react elements into one, containing all values in one array
    }, []);

    console.log(ingredientsArr);

        //**  [Array(5)] would be array with array containing 5 elements

        //[...Array(5)] results in:
       //(5) [undefined, undefined, undefined, undefined, undefined]

    return (
        <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
        {ingredientsArr.length ? ingredientsArr : <p>Please start adding ingredients</p>}
        <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default withRouter(Burger);