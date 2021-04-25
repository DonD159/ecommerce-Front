import React, {useState, useEffect} from 'react';
import Layoat from '../core/Layoat';
import { isAuthenticate } from '../auth';
import { Link,Redirect } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus,removeOrder} from './ApiAdmin';
import moment from 'moment';


const Orders = () => {
    const [orders, setOrders] = useState ([]);
    const [statusvalues, setStatusValues] = useState ([]);
    const [error, setError] = useState(false);
    const [Search , SetSearch] = useState('');

    const {user, token} = isAuthenticate();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error){
                console.log(data.error)
            } else {
                setOrders(data)
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error){
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        });
    };


    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, [])


    const ShowOrdersLemgth = () => {
        if(orders.length > 0) {
            return (
                <h1 className="text-danger display-2 col-sm-5 col-md-12 col-lg-12">Total orders: {orders.length}</h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };



    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    ) ;



    const handelStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("status update failed")
                } else {
                    loadOrders()
                }
            }
        );
    };

    const destroy = orderId => {
        removeOrder(orderId, user._id, token).then(data =>{
            console.log(user._id)
           console.log(orderId)
            if (data.error) {
               console.log(data.error) ;
            } else {
                loadOrders();
            }
        });
    };



    const handelSearchChange = e => {
        e.preventDefault()
        SetSearch(e.target.value.toLowerCase())
    }



    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={ e => (handelStatusChange(e, o._id))}>
                <option>Update Status select</option>
                {statusvalues.map((status, i) => (
                    <option key={i} value={status}>{status}</option>
                ))}
            </select>
        </div>
    );



    return(
        <Layoat title="Orders" description={` ${user.name}, you can manage all the orders`} >
            <div className="row">
                <div className="col-md-8 me-5 offset-md-2">
                    {ShowOrdersLemgth()}
                    {error}
                    <div class="container">
                    <input type="search" placeholder="Filter Order ID.." value={Search} onChange={handelSearchChange} className="form-control mb-5" style={{width: '50%', marginLeft: '25%'}} />
                    </div>
                    {orders.filter(c => c._id.toLowerCase().includes(Search)).map((o, oIndex) => {
                        return(
                            <div className="col-sm-8 col-md-12 col-lg-12 mt-5" key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                                <h4 className="mb-4">Order ID: {o._id}</h4>
                                <span onClick={() => {if(window.confirm('Are you sure to delete this?')) {destroy(o._id)};}} className="badge deletePruduct">Delete</span>
                                <br/>
                                <br/>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">{showStatus(o)}</li>
                                    <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                                    <li className="list-group-item">Amount: ${o.amount}</li>
                                    <li className="list-group-item">Order by: {o.user.name}</li>
                                    <li className="list-group-item">Order on: {moment(o.createdAt).fromNow()}</li>
                                    <li className="list-group-item">Delivery address: {o.address}</li>
                                </ul>
                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order: {o.product.length}
                                </h3>
                                {o.product.map((p, pIndex) =>(
                                    <div className="mb-4" key={pIndex} style={{padding: '20px', border: '1px solid indigo'}}>
                                        {showInput('Product name', p.name)}
                                        {showInput('Product price', p.price)}
                                        {showInput('Product total', p.count)}
                                        {showInput('Product id', p._id)}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layoat>
    );
};


export default Orders