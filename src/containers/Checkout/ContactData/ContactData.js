import React ,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false,
    }

    orderHandler=(e)=>{
        e.preventDefault();
        this.setState({loading:true})
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
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
        let form=(
            <form>
                <input
                className={classes.Input} 
                type="text"
                name="name"
                placeholder="Your name"/>
                <input
                className={classes.Input}
                type="email"
                name="email"
                placeholder="Your email"/>
                <input
                className={classes.Input} 
                type="text" 
                name="street"
                placeholder="Street"/>
                <input
                className={classes.Input} 
                type="text" 
                name="postal" 
                placeholder="Postal"/>
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