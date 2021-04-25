import React, {useState, useEffect} from 'react';
import Layoat from '../core/Layoat';
import { isAuthenticate } from '../auth';
import { Link } from 'react-router-dom';
import {getPurchaseHistory} from './ApiUser'
import moment from 'moment'
import {PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from './Invoice'


const Dashbord = () => {
    const [history, setHistory] = useState([]);

    const {user: {_id, name, email, role}} = isAuthenticate();
    const token = isAuthenticate().token;


    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else{
                setHistory(data);
            }
        });
    };


    useEffect(() => {
        init(_id, token)
    }, [])


    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group userLinks">
                    <il className="list-group-item">
                        <Link className="nav-link" to="/cart">My Card</Link>
                    </il>
                    <il className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                    </il>
                </ul>
            </div>
        )
    };


    
    const userInfo = () => {
        return (
        <div className="card mb-5">
            <h3 className="card-header">User information</h3>
            <ul className="list-group">
                <il className="list-group-item">{name}</il>
                <il className="list-group-item">{email}</il>
                <il className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</il>
            </ul>
        </div>
        )
    };


    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div key={i}>              
                                    {h.product.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>Product price: ${p.price}</h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                    <div className="pdf">
                                                    </div>
                                                </h6>
                                                <hr/>
                                            </div> 
                                        );
                                        
                                    })}
                                </div>
                            );
                        })}
                    </li>
                    <PDFDownloadLink
                        document={<Invoice history={history} />}
                        fileName="invoice.pdf"
                        className="btn btn-primary"
                    >
                        Download PDF
                    </PDFDownloadLink>
                </ul>
            </div>
        );
    };


    return (
        <Layoat title="Dashbord" description={`Welcom ${name} !`} className="container-fluid">
            <div className="row">
                <div className="col-sm-6 col-md-4 col-lg-5 mb-5">
                    {userLinks()}
                </div>
                <div className="col-sm-6 col-md-5 col-lg-6">
                    {userInfo()}
                    {purchaseHistory(history)}
                    {/* {data()} */}
                </div>
            </div>
        </Layoat>
    );
};

export default Dashbord;