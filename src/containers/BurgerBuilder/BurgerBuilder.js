import React ,{Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice:0,
        purchasable:false,
        purchasing:false,
    }

    updatePurchageState(ingredients){
        const sum=Object.keys(ingredients)
                    .map(igKey=>{
                        return ingredients[igKey]
                    })
                    .reduce((sum,el)=>{
                        return sum+el;
                    },0);

        this.setState({purchasable:sum>0});

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
        this.updatePurchageState(updateIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updateCount=oldCount-1;
        const updateIngredients={
            ...this.state.ingredients
        }
        updateIngredients[type]=updateCount;
        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction
        this.setState({totalPrice:newPrice,ingredients:updateIngredients})
        this.updatePurchageState(updateIngredients);

    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
        alert('You can continue');
    }

    render(){ 

        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                     ingredients={this.state.ingredients}
                     purchaseCancelled={this.purchaseCancelHandler}
                     purchaseContinued={this.purchaseContinueHandler}
                     price={this.state.totalPrice}/></Modal>
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControl 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    />
            </Aux>
        )
    }
}

export default BurgerBuilder;