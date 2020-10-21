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
                elemetConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
            },
            street:{
                elementType:'input',
                elemetConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipcode:{
                elementType:'input',
                elemetConfig:{
                    type:'text',
                    placeholder:'ZipCode'
                },
                value:''
            },
            country:{
                elementType:'input',
                elemetConfig:{
                    type:'text',
                    placeholder:'Countary'
                },
                value:''
            },
            email:{
                elementType:'input',
                elemetConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elemetConfig:{
                    options:[
                        {value:'fastest',placeholder:'Fastest'},
                        {value:'cheapest',placeholder:'Cheapest'}
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
                        elementConfig={formElement.config.elemetConfig}
                        value={formElement.config.value}/>
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