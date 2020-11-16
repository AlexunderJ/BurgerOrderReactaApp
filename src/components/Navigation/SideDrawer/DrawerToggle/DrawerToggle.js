import React from 'react'
import classes from'./DrawToggle.module.css'

export default function DrawerToggle(props) {
    return (
       <div className={classes.DrawerToggle} onClick={props.clicked}>
           <div></div>
           <div></div>
           <div></div>
           </div>
    )
}
