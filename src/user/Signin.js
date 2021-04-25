import React, { useState } from 'react'
import { Redirect,useHistory } from 'react-router-dom'
import Layoat from '../core/Layoat'
import { signin, authenticate, isAuthenticate } from '../auth'

const Signin = () => {


    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });

    let history = useHistory();
    const { email, password, loading, error, redirectToReferrer } = values;
    const {user} = isAuthenticate();

    
    const handelChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };


    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
        .then(data =>{
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data , () =>{
                    setValues({ ...values, redirectToReferrer: true });
                });
                
            };
        });
    };







    const signInForm = () => (
        <form className="col-8">

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handelChange('email')} type="email" className="form-control" value={email}  />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handelChange('password')} type="Password" className="form-control" value={password}  />
            </div>
                <button onClick={clickSubmit} className="btn btn-primary">submit</button>
        </form>
    );


    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    );


    // const redirectUser = () => {
    //     if (redirectToReferrer) {
    //          if (user && user.role === 1) {
    //             return <Redirect to="/admin/dashbord" />;
    //          }else {
    //             return <Redirect to="/user/dashbord" />;
    //          }
    //     }
    //     if (isAuthenticate()) {
    //         return <Redirect to="/" />;
    //     }
    // };


    const redirectRole = () => {
        
        let intended = history.location.state;
        if (intended) {
            history.push(intended);
            console.log(intended)
        } else {
            console.log("2")
            if (user && user.role === 1) {
                history.push("/admin/dashbord");
            } else{
                history.push("/user/dashbord");
            }
        }
    };


    return(
        <Layoat title="Signin" description="Signin to App" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}         
            {/* {redirectUser()} */}
            {isAuthenticate() ? (redirectRole()) : ''}
        </Layoat>
    );
};

export default Signin;