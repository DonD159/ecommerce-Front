import React from 'react';
import Layoat from '../core/Layoat';
import { isAuthenticate } from '../auth';
import { Link } from 'react-router-dom';


const AdminDashbord = () => {

    const {user: {_id, name, email, role}} = isAuthenticate();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group adminLinks">

                    <il className="list-group-item" >
                        <Link className="nav-link" to="/create/category">Create Or Delete Category</Link>
                    </il>

                    <il className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </il>

                    <il className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">View Orders</Link>
                    </il>

                    <il className="list-group-item">
                        <Link className="nav-link" to="/admin/products">Manage Products</Link>
                    </il>
                </ul>
            </div>
        )
    };


    const adminInfo = () => {
        return (
        <div className="card mb-5">
            <h3 className="card-header">Admin information</h3>
            <ul className="list-group">
                <il className="list-group-item">{name}</il>
                <il className="list-group-item">{email}</il>
                <il className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</il>
            </ul>
        </div>
        )
    };



    return (
        <Layoat title="Dashbord" description={`Welcom ${name}!`} className="container-fluid">
            <div className="row">
                <div className="col-6" style={{flex: '1 0 50%', maxWidth: '97%'}}>
                    {adminLinks()}
                </div>
                <div className="col-6" style={{flex: '1 0 50%', maxWidth: '97%',marginTop: '20px'}}>
                    {adminInfo()}
                </div>
            </div>
         
        </Layoat>
    );
};

export default AdminDashbord;