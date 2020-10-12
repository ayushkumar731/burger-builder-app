import React ,{Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:2,
            bacon:1,
            cheese:1,
            meat:2
        }
    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControl/>
            </Aux>
        )
    }
}

export default BurgerBuilder;