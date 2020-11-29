import React, { Component } from "react";
import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErorrHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
  state = {
    purchasable: true,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount(){
    // console.log(this.props);
    // axios.get('https://react-my-burger-19a41.firebaseio.com/ingredients.json')
    // .then(response =>{
    //   this.setState({ingredients: response.data});
    // })
    // .catch(error => {
    //   this.setState({error: true})
    // })
    // ;
  }

  updatePurchaseState (ingredients){
      const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum, el)=>{
      return sum + el;
    },0);
   return  sum <= 0;    
  }

  

  purchaseHandler = () => {
        this.setState({purchasing: true});
  }

  purchaceCancelHandler = () =>{
    this.setState({purchasing: false});
  }


  purchaceContinueHandler = () =>{
  this.props.history.push( '/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for(let key in disabledInfo){
      disabledInfo[key]= disabledInfo[key] <= 0
    };

    let orderSummary = null;
    
    let burger = this.state.error?<p>Ingedients cam't be loaded</p> : <Spinner />;
      if(this.props.ings){
        burger = ( 
        <>
      <Burger ingredients={this.props.ings} />
      <BuildControls
        ingredientAdded ={this.props.onIngredientAdded}  
        ingredientRemove ={this.props.onIngredientRemoved} 
        disabled = {disabledInfo}
        purchasable = {this.updatePurchaseState(this.props.ings)}
        ordered = {this.purchaseHandler}
        price = {this.props.price}/> 
        </>
        );
        
      orderSummary = <OrderSummary ingredients={this.props.ings} 
      price = {this.props.price}
      purchaceCanceled = {this.purchaceCancelHandler}
      purchaceContinue = {this.purchaceContinueHandler}/>;
    }

    if(this.state.loading){
      orderSummary = <Spinner />;
    };

    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaceCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings: state.ingredients,
    price: state.totalPrice
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    onIngredientAdded: (ingName)=> dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
    onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
