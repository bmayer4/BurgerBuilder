import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from './../Aux/Aux';
import classes from './Layout.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    DrawerToggleClicked = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
            <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.DrawerToggleClicked} />
            <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={classes.content}>
            {this.props.children}
            </main>
            </Aux>
        );
    }
   
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);