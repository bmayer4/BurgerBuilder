import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from './../../../hoc/Aux/Aux';
import Backdrop from './../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {  //*** the wrapping element controls the updating of the wrapped element */
        return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    }

    componentDidUpdate() {
        console.log('modal updating');
    }

    render() {
    return (
        <Aux>
        <Backdrop show={this.props.show} backdropClicked={this.props.backdropClicked}/>
        <div 
        className={classes.Modal}
        style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
        }}
        >
        {this.props.children}
        </div>
        </Aux>
    );
    }
}

export default Modal;