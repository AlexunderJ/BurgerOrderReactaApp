import React, { Component } from 'react';
import Layout from "./pages/Layout";
import BuilderBurger from "./pages/BurgerBuilder/BurgerBuilder";

export default class App extends Component {
   

  render(){
  return (
    <div>
      <Layout>
        <p>Test</p>
         <BuilderBurger />
      </Layout>
    </div>
  );
  }
}






