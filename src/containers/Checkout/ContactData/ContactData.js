import React ,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZipCode'
                },
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Countary'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:''
            },
        },
        loading:false,
    }

    orderHandler=(e)=>{
        e.preventDefault();
        this.setState({loading:true})
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
        }
        axios.post('/order.json',order)
            .then(res=>{
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(err =>{
                this.setState({
                    loading:false,
                })
            });
    }

    inputChnagedHandler=(event,inputTdentifier) => {
        // console.log(event.target.value);
        const updateOrderForm={
            ...this.state.orderForm
        }
        // console.log(updateOrderForm);
        const updateFormElement={
            ...updateOrderForm[inputTdentifier]
        }
        // console.log(updateFormElement);
        updateFormElement.value=event.target.value;
        updateOrderForm[inputTdentifier]=updateFormElement;
        this.setState({orderForm:updateOrderForm})
    }

    render(){ 
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form=(
            <form>
                {formElementsArray.map(formElement =>(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputChnagedHandler(event,formElement.id)}/>
                ))}
                <Button 
                btnType="Success" 
                clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form=<Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;