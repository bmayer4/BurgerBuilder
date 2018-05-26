import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './../../components/Order/Order';
import { startFetchOrders } from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {

    componentDidMount() {
        this.props.startFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        
        const displayOrders = this.props.orders.map((order) => {
            return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        })

        return (
            <div>
            {
                this.props.error ? <p style={{paddingTop: '64px', textAlign: 'center', fontSize: '18px'}}>Orders failed to load</p> : null
            }
             { 
               this.props.loading ? <div style={{ paddingTop: '64px'}}><Spinner/></div> : displayOrders 
             }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        error: state.order.error,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startFetchOrders: (token, userId) => dispatch(startFetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);