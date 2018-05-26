import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import { startOrderBurger } from '../../../store/actions/order';

class ContactData extends Component {

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'   //should use third party package for this dropdown
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayName: 'Fastest' },
                        { value: 'standard', displayName: 'Standard' }
                    ]
                },
                value: 'fastest',
                validation: {
                    required: false
                },
                valid: true
            },
        },
        formValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.startOrderBurger(order, this.props.token);
    }

    inputChangeHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {  //have to clone deeply with spread operator
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = e.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formValid: formIsValid
        })
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;  //trick to look at all cases
        }

        if (rules.minLength) {
            isValid = value.length === rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length === rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {

    //turn orderForm object into array to loop through
    const formElements = [];
    for (let key in this.state.orderForm) {
        formElements.push({
            id: key,
            config: this.state.orderForm[key]
        })
    }

        return (
            <div className={classes.ContactData}>
                {
                    this.props.purchased ? <Redirect to='/'/> : null
                }    
                <h4>Enter Your Contact Data</h4>
                {
                    this.props.loading ? <Spinner /> :
                    <form onSubmit={this.orderHandler}>
                    {formElements.map((formEl) => {
                        return <Input 
                        key={formEl.id}
                        elementType={formEl.config.elementType} 
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        invalid={!formEl.config.valid}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                        changed={(e) => { this.inputChangeHandler(e, formEl.id) }}
                        />
                    })}
                    <Button btnType={'Success'} disabled={!this.state.formValid}>Order</Button>
                </form>
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log('sate form cd', state.order);
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startOrderBurger: (order, token) => dispatch(startOrderBurger(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);