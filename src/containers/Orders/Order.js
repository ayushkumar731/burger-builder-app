import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

    state={
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/order.json')
            .then((res)=>{
                const fetchOrders=[]
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id:key
                    });
                    console.log(res.data[key])
                }
                this.setState({loading:false,orders:fetchOrders})
            })
    }


    render(){
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);