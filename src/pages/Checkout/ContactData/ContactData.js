import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

export default class ContactData extends Component {
    state= {
        name:'',
        emile:'',
        adress:{
            street:'',
            postCode:''
        },
    }
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Yor contact data</h4>
                <form action="">
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        )
    }
}