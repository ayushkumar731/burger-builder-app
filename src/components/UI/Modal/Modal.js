 import React from 'react';
 import classes from './Modal.module.css';

 const modal =(props) =>(
    <div className={classes.Modal} style={{
       transform:props.show?'translateY(0)':'transalteY(-180vh)',
       display:props.show?'block':'none'}}
    >{props.children}</div>
 )

 export default modal;