import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authLogout } from './../../../store/actions/auth';

class Logout extends Component {

    componentDidMount() {
        this.props.authLogout();
    }

    render() {
        return (
            <Redirect to='/' />
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);