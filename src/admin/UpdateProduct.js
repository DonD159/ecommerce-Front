import React, {useState, useEffect} from 'react';
import Layoat from '../core/Layoat';
import { isAuthenticate } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct, getProducts } from './ApiAdmin';


const UpdateProduct = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        color: '',
        size: '',
        sizenumber: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {user, token} = isAuthenticate()
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        color,
        size,
        sizenumber,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } =  values;


    const init = (productId) => {
        getProduct(productId).then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            } else{
                setValues({...values, 
                    name: data.name, 
                    description: data.description, 
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    color: data.color,
                    size: data.size,
                    sizenumber: data.sizenumber,
                    formData: new FormData()
                });
                initCategories();
            };
        })
    };


    //load categories and set from data
    const initCategories = () => {
        getCategories().then(data =>{
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({categories: data, formData: new FormData()});
            }
        });
    };


    useEffect(() => {
        init(match.params.productId);
    },[]);


    const handelCahnge = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };


    const clickSubnit = (e) => {
        e.preventDefault();
        setValues({...values, error: '', loading: true});
        updateProduct(match.params.productId, user._id, token, formData).then(data =>{
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, name: '', description: '', photo: '', price: '', quantity: '', color: '', size:'', sizenumber: '', loading: false, error: false, redirectToProfile: true, createProduct: data.name});
            }
        });
    };


    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubnit}>
            <h4>Post Photo</h4>

            <div className="form-group mb-2">
                <label className="btn btn-secondary">
                    <input onChange={handelCahnge('photo')} multiple  type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group mb-2">
                <label className="text-muted">Name</label>
                <input onChange={handelCahnge('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group mb-2">
                <label className="text-muted">Description</label>
                <textarea onChange={handelCahnge('description')} type="text" className="form-control" value={description} />
            </div>

            <div className="form-group mb-2">
                <label className="text-muted">Color</label>
                <input onChange={handelCahnge('color')} type="text" className="form-control" value={color} />
            </div>

            <div className="form-group">
                <div className="form-group">
                <label className="text-muted">Size</label>
                <select onChange={handelCahnge('size')} className="form-control" >
                    <option>Please select</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
            </div>


            <div className="form-group">
                <div className="form-group">
                <label className="text-muted">Size Number</label>
                <select onChange={handelCahnge('sizenumber')} className="form-control" >
                    <option>Please select</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                </select>
            </div>
            </div>
            

            <div className="form-group mb-2">
                <label className="text-muted">Price</label>
                <input onChange={handelCahnge('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group mb-2">
                <label className="text-muted">Category</label>
                <select onChange={handelCahnge('category')} className="form-control" >
                        <option>Please select</option>
                        {categories && categories.map((c, i) => (
                       <option key={i} value={c._id}>{c.name}</option>
                   ))}
                </select>
            </div>

            <div className="form-group mb-2">
                <label className="text-muted">Shipping</label>
                <select onChange={handelCahnge('shipping')} className="form-control" >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group mb-4">
                <label className="text-muted">Quantity</label>
                <input onChange={handelCahnge('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-dark mb-4">Update Product</button>

        </form>
    )



    const showError = () => (
       <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
           {error}
       </div>    
    );


    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>    
     );



     const showLoading = () => 
        loading && (<div className="alert alert-success"><h2>Loading...</h2></div>);   


        const redirectUser = () => {
            if(redirectToProfile) {
                if(!error) {
                    return <Redirect to="/" />
                }
            }
        };



    return(
        <Layoat title="Update a product" description={`Update product ${user.name} !`} >
            <div className="row container">
                <div className="col-md-6 offset-md-5">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layoat>
    );
}

export default UpdateProduct;