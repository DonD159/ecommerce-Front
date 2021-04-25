import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivetRoute from './auth/PrivetRoute';
import Dashbord from './user/UserDashbord'
import AdminRoute from './auth/AdminRoute';
import AdminDashbord from './user/AdminDashbord';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import NewArrivals from './core/NewArrivals';
import BestSellers from './core/BestSellers';


const Routes = () => {
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} /> 
                    <Route path="/shop" exact component={Shop} /> 
                    <Route path="/Signin" exact component={Signin} /> 
                    <Route path="/Signup" exact component={Signup} /> 
                    <PrivetRoute path="/user/dashbord" exact component={Dashbord}/>
                    <AdminRoute path="/admin/dashbord" exact component={AdminDashbord}/>
                    <AdminRoute path="/create/category" exact component={AddCategory}/>
                    <AdminRoute path="/create/product" exact component={AddProduct}/>
                    <AdminRoute path="/admin/products" exact component={ManageProducts}/>
                    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                    <AdminRoute path="/admin/orders" exact component={Orders}/>
                    <Route path="/product/:productId" exact component={Product} /> 
                    <Route path="/cart" exact component={Cart} /> 
                    <PrivetRoute path="/profile/:userId" exact component={Profile}/>
                    <Route path="/newarrivals" exact component={NewArrivals} /> 
                    <Route path="/bestsellers" exact component={BestSellers} /> 
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Routes;