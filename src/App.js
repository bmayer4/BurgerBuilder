import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import PublicRoute from './hoc/Routes/PublicRoute';
import PrivateRoute from './hoc/Routes/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div>
      <Layout>
      <Switch>
        <Route path='/' component={BurgerBuilder} exact />
        <PrivateRoute path='/checkout' component={Checkout} />
        <PrivateRoute path='/orders' component={Orders} />
        <Route path="/auth" component={Auth} />   
        <PrivateRoute path='/logout' component={Logout} />
      </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;   

//cant make Auth route private because I need to handle redirecting in the component based on what the redirectroute is in auth reducer