import React, { Component } from 'react';

import {Route, Switch} from 'react-router-dom';
import Layout from "./pages/Layout";
import BuilderBurger from "./pages/BurgerBuilder/BurgerBuilder";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Auth from '../src/pages/Auth/Auth';
import Logout from '../src/pages/Auth/Logout/Logout';


export default class App extends Component {
 

  render(){
  return (
    <div>
      <Layout>
        <Switch>
         <Route path='/checkout' component={Checkout} />
         <Route path='/orders' component={Orders} />
         <Route path='/auth' component={Auth} />
         <Route path='/logout' component={Logout} />
         <Route path='/' exact component={BuilderBurger} />
         </Switch>
          </Layout>
    </div>
  );
  }
}






