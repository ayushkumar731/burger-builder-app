import React ,{Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES={
    salad:10,
    cheese:15,
    meat:50,
    bacon:20,
}

class BurgerBuilder extends Component{

    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0 
        },
        totalPrice:0
    }

     addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updateCount=oldCount+1;
        const updateIngredients={
            ...this.state.ingredients
        }
        updateIngredients[type]=updateCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updateIngredients});
    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControl ingredientAdded={this.addIngredientHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;