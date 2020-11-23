import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErorrHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: true,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount(){
    console.log(this.props);
    axios.get('https://react-my-burger-19a41.firebaseio.com/ingredients.json')
    .then(response =>{
      this.setState({ingredients: response.data});
    })
    .catch(error => {
      this.setState({error: true})
    })
    ;
  }

  updatePurchaseState (ingredients){
      const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((sum, el)=>{
      return sum + el;
    },0);
    this.setState({purchasable: sum <= 0})
    
  }

  addIngredientHandler =(type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
    }

  removeIngredientHandler =(type) =>{
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
      return;
    }
    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }


  purchaseHandler = () => {
        this.setState({purchasing: true});
  }

  purchaceCancelHandler = () =>{
    this.setState({purchasing: false});
  }


  purchaceContinueHandler = () =>{
   

const queryParams = [];
for(let i in this.state.ingredients){
  queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}
queryParams.push('price=' + this.state.totalPrice)
const queryString = queryParams.join('&');
  this.props.history.push({
    pathname: '/checkout',
    search: '?' + queryString
  })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key]= disabledInfo[key] <= 0
    };

    let orderSummary = null;
    
    let burger = this.state.error?<p>Ingedients cam't be loaded</p> : <Spinner />;
      if(this.state.ingredients){
        burger = ( 
        <>
      <Burger ingredients={this.state.ingredients} />
      <BuildControls
        ingredientAdded ={this.addIngredientHandler}  
        ingredientRemove ={this.removeIngredientHandler} 
        disabled = {disabledInfo}
        purchasable = {this.state.purchasable}
        ordered = {this.purchaseHandler}
        price = {this.state.totalPrice}/> 
        </>
        );
        
      orderSummary = <OrderSummary ingredients={this.state.ingredients} 
      price = {this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
