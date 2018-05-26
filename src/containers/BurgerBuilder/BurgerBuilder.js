import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from './../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import { addIngredient, removeIngredient, startFetchIngredients } from '../../store/actions/burgerBuilder';
import { orderInit } from '../../store/actions/order';
import { authSetRedirect } from '../../store/actions/auth';

class BurgerBuilder extends Component {
    
    componentDidMount() {
        this.props.startFetchIngredients();
    }

    state = {
        purchasing: false  //for showing modal
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map((ing) => {
            return ingredients[ing];
        }).reduce((sum, value) => {
            return sum + value
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.authSetRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.orderInit();
        this.props.history.push('/checkout'); 
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0
        }

        return (
            <Aux>
            <Modal show={this.state.purchasing} backdropClicked={this.purchaseCancelHandler}>
            <OrderSummary 
            ingredients={this.props.ingredients} 
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            totalPrice={this.props.price}
            />
            </Modal>
            {
                this.props.error ? <p style={{paddingTop: '64px', textAlign: 'center', fontSize: '18px'}}>Ingredients failed to load</p> : null
            }
           { 
            !this.props.ingredients ? <Spinner /> :
            <Aux>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls  
            price={this.props.price}
            addIngredient={this.props.addIngredient} 
            removeIngredient={this.props.removeIngredient} 
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            purchaseable={this.updatePurchaseState(this.props.ingredients)}
            />
            </Aux>
           }
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: !!state.auth.token
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addIngredient: (ing) => dispatch(addIngredient(ing)),
        removeIngredient: (ing) => dispatch(removeIngredient(ing)),
        startFetchIngredients: () => dispatch(startFetchIngredients()),
        orderInit: () => dispatch(orderInit()),
        authSetRedirect: (path) => dispatch(authSetRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);