import * as actionTypes from '../actions/actionTypes';

const initialState={
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:0,
}

const INGREDIENT_PRICES={
    salad:10,
    cheese:15,
    meat:50,
    bacon:20,
}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case (actionTypes.ADD_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            }
        case (actionTypes.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;

    }
}

export default reducer;