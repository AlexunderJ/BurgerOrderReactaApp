import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../pages/Checkout/ContactData/ContactData';


export default class Checkout extends Component {
    state = {
        ingredients:{
            salad: 1,
            meat: 1,
            cheese:1,
            bacon: 1,
        }
        };

        onCheckoutCancelHandler =() =>{
            this.props.history.goBack();
        }

        checkoutContinue =()=>{
            this.props.history.replace('/checkout/contact-data');
            
        }
        componentDidMount(){
            const query = new URLSearchParams(this.props.location.search);
            const ingredients ={};
            for(let param of query.entries() ){
                ingredients[param[0]] = +param[1]
            }
            this.setState({ingredients: ingredients});
        }
    
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                onCheckoutCancel={this.onCheckoutCancelHandler} 
                checkoutContinue={this.checkoutContinue}
                />  
                <div>
                <Route path={this.props.match.path + '/contact-data'}  component={ContactData} />
                </div>
            </div>
        
        )
    }

}