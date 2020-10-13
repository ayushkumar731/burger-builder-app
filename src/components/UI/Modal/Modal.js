 import React from 'react';
 import classes from './Modal.module.css';
 import Aux from '../../../hoc/Auxilliary';
 import Backdrop from '../Backdrop/Backdrop';

 const modal =(props) =>(
    <Aux>
       <Backdrop show={props.show} clicked={props.modelClosed}/>
      <div className={classes.Modal} style={{
         transform:props.show?'translateY(0)':'transalteY(-180vh)',
         display:props.show?'block':'none'}}
      >{props.children}</div>
    </Aux>
 )

 export default modal;