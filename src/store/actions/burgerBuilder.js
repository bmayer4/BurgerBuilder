import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const fetchIngredients = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const startFetchIngredients = () => {
    return (dispatch, getState) => {
        axios.get('https://react-burger-f4fb7.firebaseio.com/ingredients.json').then((response) => {
            dispatch(fetchIngredients(response.data));
        }).catch((e) => {
            dispatch(fetchIngredientsFailed());
        })
    }
}
