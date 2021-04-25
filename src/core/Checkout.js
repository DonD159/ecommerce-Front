import React, { useEffect, useState } from 'react';
import {getBraintreeToken, processPayment, createOrder} from './ApiCore';
import {isAuthenticate} from '../auth';
import { emptyCart } from './CardHelpers';
import { Link,Redirect } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import mapboxgl from 'mapbox-gl';


const Checkout = ({ product, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
        creditCard: ''
    });



    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;


    const getToken = (userId, token) => {
        getBraintreeToken(userId, token).then(data => {
            if(data.error){
                setData({ ...data, error: data.error });
            } else{
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);



    const handelAddress = e => {
        setData({ ...data, address: e.target.value });
    };



    const getTotal = () => {
        return product.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };



    const showCheckout = () => {
       return isAuthenticate() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Signin in to checkout</button>
            </Link>
        );
    };



    let deliveryAddress = data.address;

    const buy = () => {
      setData({ loading: true });
        //send the nonce to server
        //nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            nonce = data.nonce;
            console.log("send nonce and total: ", nonce, getTotal(product))
            const paymentData = {
                paymentMethodNonce : nonce,
                amount: getTotal(product)
            };

            processPayment(userId, token , paymentData)
                .then(response => {
                    console.log("response 2",response);
                    
                    const createOrderData ={
                        product: product,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress,
                    };
                    createOrder(userId, token, createOrderData)
                    .then(response => {
                        mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZG9uZCIsImEiOiJja21kem1yZmEycWNoMnZwMTYzYjZrZHRjIn0.CM0Ddc5APZW30WPQEArbSw';
                        const map = new mapboxgl.Map({
                        container: 'map', // container ID
                        style: 'mapbox://styles/mapbox/streets-v11', // style URL
                        center: response.geometry && response.geometry.coordinates , // starting position [lng, lat]
                        zoom: 10 // starting zoom
                        });
                
                        new mapboxgl.Marker()
                            .setLngLat(response.geometry && response.geometry.coordinates)
                            .setPopup(
                                new mapboxgl.Popup({ offset: 25})
                                    .setHTML(
                                        `<h3>${response.user.name}</h3><p>${response.address}</p>`
                                    )
                            )
                            .addTo(map)
                            
                        console.log("response",response)
                        emptyCart(() => {
                        setRun(!run); // run useEffect in parent Cart
                        console.log('payment success and empty cart');
                        setData({
                            loading: false,
                            success: true,
                        });
                    });
                    setTimeout(function(){
                        window.location.reload(1);
                    }, 6000);
                })
                .catch(error => {
                    console.log(error);
                    setData({ loading: false });
                });
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
                });
            })
        .catch(error =>{
            // console.log("error ", error);
            setData({...data, error: error.message});
            });
        };


    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: ""})}>
            {data.clientToken !== null && product.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted mb-2">Delivery address:</label>
                        <textarea  
                            onChange={handelAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here... 
                            Country, City"
                        />
                    </div>

                    <DropIn 
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: "vault"
                            }
                        }} 
                        onInstance={instance => (data.instance = instance)} 
                    />
                        <button onClick={buy} className="btn btn-success btn-block">Pay</button>  

                </div>
            ) : null}
        </div>
    );


    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
    );


    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? "" : "none"}}>
            Thanks! You payment was successful!
        </div>
    );


    const showLoading = loading => loading && <h2>Loading...<br/></h2>;
        


    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};



export default Checkout;