import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticate } from '../auth';
import {itemTotal} from '../core/CardHelpers';
import { FiUserCheck } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineShopping } from 'react-icons/ai';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: 'rgb(214, 214, 214)'}
    }
};


const Menu = ({ history }) => (
    <div className="navbarglobal">
        <ul className="nav nav-tabs navbar">
            <li className="nav-item homenav">
                <Link className="nav-link" style={isActive(history, '/')} to="/">HOME</Link>
            </li>

            <li className="nav-item shopnav">
                <Link className="nav-link" style={isActive(history, '/shop')} to="/shop"><AiOutlineShopping style={{fontSize: '22px', marginTop: '-5px'}}/> Shop</Link>
            </li>

            <li className="nav-item cartnav">
                <Link className="nav-link" style={isActive(history, '/cart')} to="/cart">
                    <AiOutlineShoppingCart style={{fontSize: '22px'}} /> <sup><small className="cart-badge">{itemTotal()}</small></sup>
                </Link>
            </li>

        <ul className="nav nav-tabs left">  
            {isAuthenticate() && isAuthenticate().user.role === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashbord')} to="/user/dashbord"> <FiUserCheck /> {isAuthenticate().user.name} </Link>
                </li>
            )}


            {isAuthenticate() && isAuthenticate().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/admin/dashbord')} to="/admin/dashbord"> <FiUserCheck /> {isAuthenticate().user.name} </Link>
                </li>
            )}
             
            {!isAuthenticate() && (
            <>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                </li>
            </>
            )}

            {isAuthenticate() && (
            <li className="nav-item">
                <Link to="" className="nav-link" style={{cursor: 'pointer', color: 'rgb(214, 214, 214)'}} onClick={() => signout(() => {
                    history.push('/')
                })}>Signout</Link>
            </li>
            )}
        </ul> 
        </ul>
    </div>
);

export default withRouter(Menu);