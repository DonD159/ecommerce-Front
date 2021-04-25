import React, {useState, useEffect} from 'react';
import Layoat from '../core/Layoat';
import { isAuthenticate } from '../auth';
import { Redirect } from 'react-router-dom';
import { createProduct, getCategories } from './ApiAdmin';


const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        color: "",
        size: '',
        sizenumber: '',
        colorr: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {user, token} = isAuthenticate();
    
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        color,
        size,
        sizenumber,
        colorr,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } =  values;

    const [loadings, setLoadings] = useState(false);

    //load categories and set from data
    const init = () => {
        getCategories().then(data =>{
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, categories: data, formData: new FormData()});
            }
        });
    };


    useEffect(() => {
        init();
    },[]);


    const handelCahnge = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        console.log(e.target.files)
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    // const handelfiles = e => {
    //     let files = e.target.files;
    //     for (let i = 0; i < files.length; i++){
    //         formData.set('photo' + i, files[i]);
    //     }
    //     console.log(files)
    //     setValues({...values, files});
    // };



    const clickSubnit = (e) => {
        e.preventDefault();
        setValues({...values, error: '', loading: true});
        createProduct(user._id, token, formData).then(data =>{
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, name: '', description: '', photo: '', price: '', quantity: '', color: '', size: '', sizenumber: '', colorr: '', loading: false, redirectToProfile: true, createProduct: data.name});
            }
        });
    };


    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubnit} encType="multipart/form-data">
            <h4>Post Photo</h4>
  
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handelCahnge('photo')} multiple type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handelCahnge('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handelCahnge('description')} type="text" className="form-control" value={description} />
            </div>


            <div className="form-group">
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

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handelCahnge('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handelCahnge('category')} className="form-control" >
                        <option>Please select</option>
                        {categories && categories.map((c, i) => (
                       <option key={i} value={c._id}>{c.name}</option>
                   ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handelCahnge('shipping')} className="form-control" >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handelCahnge('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>

        </form>
    )



    const showError = () => (
       <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
           {error}
       </div>    
    );


    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is created!</h2>
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
        <Layoat title="Add a new product" description={`Add product ${user.name} !`} className="container-fluid" >
            <div className="row col-10">
                <div className="col-md-6 me-5 offset-md-4">

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

export default AddProduct;