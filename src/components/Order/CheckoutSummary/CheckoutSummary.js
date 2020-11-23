import React from 'react';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';


export default function CheckoutSummary(props) {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> Good burger for You </h1>
            <Burger ingredients={props.ingredients}/>
            <Button btnType='Danger' clicked={props.onCheckoutCancel}>Cancel</Button>
            <Button btnType='Success' clicked={props.checkoutContinue} >Continue</Button>
        </div>
    )
}
