import React, {useState, useEffect} from 'react';
import Layoat from '../core/Layoat';
import { isAuthenticate } from '../auth';
import { Link } from 'react-router-dom';
import {getProducts, deleteProduct} from './ApiAdmin';



const ManageProducts = () => {

    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [Search , SetSearch] = useState('');
    const {user, token} = isAuthenticate();

    const loadProducts = () => {
        getProducts().then(data =>{
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    }


    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data =>{
            if (data.error) {
               setError(data.error) ;
            } else {
                loadProducts();
            }
        });
    };


    const handelSearchChange = e => {
        e.preventDefault()
        SetSearch(e.target.value.toLowerCase())
    }


    useEffect(() => {
        loadProducts();
    }, [])

    return(
        <Layoat title="Manage Products" description="Perform Crud on Products" className="container-fluid">
            <div className="row">
                <div className="col-12">
                <h2 className="text-center mb-4">Total {products.length} Products</h2>
                {error}
                <div class="container">
                    <input type="search" placeholder="Filter.." value={Search} onChange={handelSearchChange} className="form-control mb-5" style={{width: '50%', marginLeft: '25%'}} />
                    </div>
                    <ul className="list-group">
                        {products.filter(c => c.name.toLowerCase().includes(Search)).map((p, i) => (
                            <li key={i} className="list-group-item d-flexs justify-content-between align-items-center">
                                {console.log(products)}
                                    <strong><h5>{p.name}</h5></strong>
                                    <p style={{color: '#800e0e'}}>{p.category.name}</p>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <span className="badge updatePruduct">Update</span>
                                    </Link>
                                    <span onClick={() => {if(window.confirm('Are you sure to delete this?')) {destroy(p._id)};}} className="badge deletePruduct">Delete</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layoat>
    );
};


export default ManageProducts;