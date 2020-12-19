import React, { Component } from 'react';

import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./pages/Layout";
import BuilderBurger from "./pages/BurgerBuilder/BurgerBuilder";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Auth from '../src/pages/Auth/Auth';
import Logout from '../src/pages/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(class App extends Component {
 
  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  render(){
    let routes = (
      
       <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={BuilderBurger} />
      <Redirect to='/' />
      </Switch>
      
    );

      if (this.props.isAuthenticated){
        routes = (
          <Switch>
            <Route path='/auth' component={Auth} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BuilderBurger} />
          </Switch>
        );
      }

  return (
    <div>
      <Layout>
       {routes}
          </Layout>
    </div>
  );
  }
}))






