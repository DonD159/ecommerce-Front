import React, {useState, useEffect} from 'react';
import Layoat from '../core/Layoat';
import { isAuthenticate } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, UpdateUser } from './ApiUser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Profile = ({match}) => {
    const [values, setVlues] = useState({
        name: '',
        email: '',
        password: '',
        number: '',
        error: false,
        success: false
    })

    const [show, setShow] = useState(false);



    const {token} = isAuthenticate();
    const {name,email,password,number,error,success} = values;

    const init = (userId) => {
        read(userId, token).then(data =>{
            if(data.error) {
                setVlues({...values, error: true})
            } else{
                setVlues({ ...values, name: data.name, email: data.email, number: data.number })
            }
        })
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);


    const handelChange = name => e => {
        setVlues({...values, error: false, [name]: e.target.value})
    };


    const clickSubmit = (e) => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password, number}).then(data => {
            if(data.error) {
                console.log(data.error);
            }else {
                UpdateUser(data, () => {
                    setVlues({...values, name: data.name, email: data.email, success:true});
                });
            }
        })
    };


    const redirectUser = (success) => {
        if(success) {
            return <Redirect to="/cart" />
        }
    };


    const profileUpdate = (name, email, password) => (
        <form className="ms-5">
            <div className="form-group mb-2">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handelChange("name")} className="form-control" value={name} />
            </div>

            <div className="form-group mb-3">
                <label className="text-muted">Email</label>
                <input type="text" onChange={handelChange("email")} className="form-control" value={email} />
            </div>

            <div className="form-group mb-4">
            <h8 className="text-muted">Phone</h8>
            <br/>
              <Button variant="primary" onClick={() => setShow(true)}>
              + Add A Number
              </Button>
            </div>

            <div className="form-group mb-5">
                <label className="text-muted">Phone</label>
                <input type="text" onChange={handelChange("Phone")} disabled className="form-control" value={number} />
            </div>

            <div className="form-group mb-3">
            <h4>Change Password</h4>
            <label className="text-muted">Password</label>
                <input type="text" onChange={handelChange("password")} className="form-control" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn-dark btnhover mb-4">Save</button>
        </form>
    );


    return(
        <Layoat title="Profile Settings" description="Update your profile" className="container-fluid col-sm-6 col-md-4 col-lg-5">
            <h2 className="mb-5 ms-5">Edit User - {name}</h2>
            {profileUpdate(name, email, password, number)}
            {redirectUser(success)}
        
              <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header className="color-primary">
                  <Modal.Title id="example-custom-modal-styling-title">
                   Phone number
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input type="text" onChange={handelChange("number")} className="form-control" value={number} />
                <br/>
                <button onClick={clickSubmit} className="btn btn-dark btnhover">Save</button>
                </Modal.Body>
              </Modal>
        </Layoat>
    );
};



export default Profile;