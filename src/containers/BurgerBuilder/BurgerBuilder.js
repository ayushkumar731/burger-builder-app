import React ,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES={
    salad:10,
    cheese:15,
    meat:50,
    bacon:20,
}

class BurgerBuilder extends Component{

    state={
        totalPrice:0,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        // axios.get('https://burger-builder-a98ca.firebaseio.com/ingredients.json')
        //     .then(res=>{
        //         this.setState({ingredients:res.data});
        //     })
        //     .catch(err=>{
        //         this.setState({error:true})
        //     })
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
        // alert('You can continue');
        const queryParams =[];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        
        console.log(queryParams);
        const queryString =queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
    }

    render(){ 

        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        
        let orderSummary=null;

       


       let burger=this.state.error ?<p>ingredients not render</p>:<Spinner/>;

        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/> 
                    <BuildControl 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        />
                </Aux>
            )
            orderSummary= <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>
        }

        if(this.state.loading){
            orderSummary=<Spinner/>
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        ings:state.ingredients
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),

        onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));