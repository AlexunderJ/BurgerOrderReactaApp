import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToogel from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle'

export default function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <DrawerToogel clicked={props.menuToggle}/>

            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
           <NavigationItems isAuthenticated={props.isAuth} />
           </nav>
        </header>
    )
}
