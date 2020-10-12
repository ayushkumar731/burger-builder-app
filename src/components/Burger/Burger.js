import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient'
import classes from './Burger.module.css';

const burger=(props) => {

    let transformIngredients=Object.keys(props.ingredients).map(igKey=>{
        // console.log(props.ingredients);
        // console.log(igKey);
        // console.log([...Array(props.ingredients[igKey])]);
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            // console.log(i)
            // console.log(igKey)
           return  <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[])

// console.log(transformIngredients.length)

    if(transformIngredients.length===0){
        transformIngredients='Please add ingredient'
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default burger;