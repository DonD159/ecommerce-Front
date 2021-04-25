import React, { useState} from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import ShowImageCardView from './ShowImageCardView';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './CardHelpers';
import { BsArrowRight } from 'react-icons/bs';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthenticate } from '../auth';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { FiUserCheck } from 'react-icons/fi';
 
const CartViewProduct = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);


  const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
      marginTop: '-2px'
    },
  });


  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };
  
  const addToCart = () => {
      // console.log('added');
      addItem(product, setRedirect(true));
  };

 
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
 

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <>
        <div className="btnaddToCart">
          <button onClick={addToCart} className="btn mt-2 mb-2 card-btn-1 addtocart col-sm-5 ">
            ADD TO CART <BsArrowRight style={{fontSize: '30px', marginLeft: '118px'}} />
          </button>
        </div>
         <hr/>
         </>
      )
    );
  };

 
  const showStock = quantity => {
    return quantity > 0 ? (
     <div className="instock"><span className="badge badge-primary badge-pill">In Stock {quantity} </span></div>
    ) : (
     <div className="instock"><span className="badge badge-danger badge-pill">Out of Stock </span></div>
    );
  };

 
  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

 
  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3 ">
            <div className="input-group-prepend ">
              <span className="input-group-text QuantityLinetwo">Quantity</span>
            </div>
            <input type="number" className="QuantityLine" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };



  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };


  const ratingStarsComments = () =>{
    return(
      <div className={classes.root}>
      <Rating
        name="review[rating]"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
    )
  }


  const newPostForm = () => {
    return (
  <>
    <form action={`http://localhost:5000/api/product/${product._id}/reviews/${isAuthenticate().user._id}`} method="POST" className="mb-3" >
      <h2 className="mb-3">Leave a Comment</h2>  {!isAuthenticate() && (<Link to="/signin">Sign in to comment</Link>)}
      {isAuthenticate() && (

      <div className="mb-4 mt-4" style={{display: 'flex'}}>
          <label htmlFor="rating">Rating</label>
            {ratingStarsComments()}
      </div>
      )}
      {isAuthenticate() && (
      <div className="mb-3">
          <label htmlFor="body"><span>Comment</span></label>
          <textarea className="form-control col-sm-3 col-md-4 col-lg-3" name="review[body]" id="body" cols="30" rows="3"></textarea>
      </div>
      )}
      {isAuthenticate() && (
          <button className="btn btn-success">Submit</button>
      )}
    </form>
  {product.reviews.map((review, i) =>(
            <div key={i} className="comment">
              <div className="commentbody">
                <div className="mb-2" style={{fontSize:'16px'}}><FiUserCheck  style={{color: 'green', marginRight: '3px', marginTop: '-3px'}}/>  
                  <label style={{fontWeight: '500'}}>{(review.author && review.author.name)}</label>
                </div>
                <p className="starability-result stars mb-4" data-rating={review.rating}></p>
                <label className="mb-4" style={{fontSize: '12px'}}>{moment(review.createdAt).fromNow()}</label>
                <label className="commenText mb-4">{review.body}</label>
                  {isAuthenticate() && review.author && review.author._id == isAuthenticate().user._id || isAuthenticate().user.role == 1 ? (
                    <form action={`http://localhost:5000/api/product/${product._id}/reviews/${review._id}?_method=DELETE`} method="POST">
                      <button className="badge btn-danger" style={{fontSize: 'smaller'}}>Delete</button>
                    </form>
                  ) : '' }
              </div>
            </div>  
          ))}
          <br/>
          <hr/>
  </>
    )
  }



  return (
  <>
   <div className="row"> 
  <Carousel className="col-sm-6 col-md-6 col-lg-6">
      <Carousel.Item>
        <ShowImageCardView item={product} url="product" />
      </Carousel.Item>
  </Carousel>



    <div className="col-sm-6 col-md-6 col-lg-6">

        <h6 style={{display: 'flex', justifyContent: 'flex-end'}}>Category • {product.category && product.category.name}</h6>
        {showStock(product.quantity)}
        <p className="Addedon" style={{fontSize: '13px'}}>Added on {moment(product.createdAt).fromNow()}</p>
        <h1 style={{
          textAlign: 'center',
          fontWeight:'bold', 
          marginBottom: '92px',
          marginTop: '70px'
        }}>
          {product.name}
        </h1>
        {shouldRedirect(redirect)}  
        <p>{product.color}</p>  
        <span className="SizeProd">Size</span>
        <div className="Size">
          <select style={{width: '30%', alignItems: 'center',marginLeft: '254px'}} class="form-select">
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xm">XL</option>
          </select>
        </div>
        <p>{product.sizenumber}</p> 
        <p className="mt-2 descripProduct">{product.description.substring(0, 1000)}</p>
        <p className="" style={{color: 'rgb(255, 102, 0)',fontWeight: 'bold'}}><strong><h4>US $ {product.price}</h4></strong></p>
    </div>
    {showAddToCartBtn(showAddToCartButton)}
  </div> 
          <br /><br />
          {showCartUpdateOptions(cartUpdate)}

          {showViewButton(showViewProductButton)}
  
          {showRemoveButton(showRemoveProductButton)}

         {!isAuthenticate() ? (
          <Link to={{
            pathname: "/signin", 
            state: { state: `/product/${product._id}` }}}>
              Sign in to comment
          </Link>) : ( newPostForm() )}
         <br /><br />
    </>
    );       
  };
 
export default CartViewProduct;