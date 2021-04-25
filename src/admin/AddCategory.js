import React, {useState,useEffect} from 'react';
import Layoat from '../core/Layoat';
import { isAuthenticate } from '../auth';
import { Link } from 'react-router-dom';
import { createCatrgory,deleteCategory } from './ApiAdmin';
import { getCategories } from '../core/ApiCore';


const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [category, setCategory] = useState([]);

    // destructure user and token from localstorage
    const {user, token} = isAuthenticate();


    const loadCategory = () => {
        getCategories().then(data =>{
            if (data.error) {
                console.log(data.error);
            } else {
                setCategory(data);
            }
        });
    }


    const handelChange = (e) => {
        setError('');
        setName(e.target.value);
    }


    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // request to api create category
        createCatrgory(user._id, token, {name}).then(data => {
            if (data.error) {
                setError(true);
            } else {
                setError('');
                setSuccess(true);
            }
        });
    };


    const destroy = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data =>{
            if (data.error) {
                console.log(data.error);
            } else {
                loadCategory();
            }
        });
    };


    useEffect(() => {
        loadCategory();
    }, [])


    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name category</label>
                <input type="text" className="form-control" onChange={handelChange} value={name} autoFocus required />
            </div>
            <br />
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );


    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>;
        }
    };


    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };


    const goBack = () => (
        <div className="mt-5 mb-4">
            <Link to="/admin/dashbord" className="text-dark backdash">
                Back to Dashbord
            </Link>
        </div>
    );



    return(
        <Layoat title="Add a new category" description={`Add category or Delete`} className="container" >
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                    <ul className="list-group">
                        {category.map((p, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <strong><h5>{p.name}</h5></strong>
                                    <span onClick={() =>{if(window.confirm('Are you sure to delete this?')) {destroy(p._id)};}} className="badge deletePruduct">Delete</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layoat>
    );
};



export default AddCategory;