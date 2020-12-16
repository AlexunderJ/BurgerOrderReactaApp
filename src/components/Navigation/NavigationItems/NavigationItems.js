import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

export default function NavigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact >Burger Builder</NavigationItem>
            <NavigationItem link='/orders'>Checkout</NavigationItem>
           { !props.isAuthenticated 
            ? <NavigationItem link='/auth'>Authenticate</NavigationItem>
            : <NavigationItem link='/logout'>Logout</NavigationItem>
        }
        </ul>
    )
}
