import React ,{Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES={
    salad:10,
    cheese:15,
    meat:50,
    bacon:20,
}

class BurgerBuilder extends Component{

    state={
        ingredients:null,
        totalPrice:0,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('https://burger-builder-a98ca.firebaseio.com/ingredients.json')
            .then(res=>{
                this.setState({ingredients:res.data});
            })
            .catch(err=>{
                this.setState({error:true})
            })
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
        this.setState({loading:true})
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Ayush Kumar',
                address:{
                    locality:'Patel Nagar',
                    zipcode:822101,
                },
                email:'kumarayush731@gmail.com'
            }
        }
        axios.post('/order.json',order)
            .then(res=>{
                this.setState({
                    loading:false,
                    purchasing:false,
                    ingredients:{
                        salad:0,
                        bacon:0,
                        cheese:0,
                        meat:0 
                    }
                })
            })
            .catch(err =>{
                this.setState({
                    loading:false,
                    purchasing:false,
                    ingredients:{
                        salad:0,
                        bacon:0,
                        cheese:0,
                        meat:0 
                    }
                })
            });
    }

    render(){ 

        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        
        let orderSummary=null;

       


       let burger=this.state.error ?<p>ingredients not render</p>:<Spinner/>;

        if(this.state.ingredients){
            burger=(
                <Aux>
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
            orderSummary= <OrderSummary
                ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder,axios);