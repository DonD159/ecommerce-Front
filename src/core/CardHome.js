import React, { useState,useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './CardHelpers';

 
const CardHome = ({
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
  
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn-grad">View Product</button>
        </Link>
      )
    );
  };


  const FadeInSection = (props) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      });
      observer.observe(domRef.current);
    }, []);
    return (
      <div
        className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
        ref={domRef}
      >
        {props.children}
      </div>
    );
  }
  
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
        <button onClick={addToCart} className="btn-grad1">
          Add to cart
        </button>
      )
    );
  };
 
  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock {quantity} </span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock </span>
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
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
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
  return (
    <FadeInSection>
    <div className="">
      <div className="" style={{textAlign: 'center', fontWeight: 'bold'}}>{product.name}</div>
      <div className="cardbody">
        {shouldRedirect(redirect)}
        <Link to={`/product/${product._id}`} className="mr-2 mb-1">
        <ShowImage item={product} url="product" />
        </Link>
        <Link to={`/product/${product._id}`} className="mr-2 descriphome">
        <p className="mb-1">{product.description.substring(0, 38)}...</p>
        </Link>
        <p>{product.color}</p>
        {console.log(product.colorr)}
        <p className="mb-2" style={{color: '#f60', fontWeight: 'bold'}}>US $ {product.price}</p>
        <p className="mb-2">Added on {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br />
        <br />
        {showViewButton(showViewProductButton)}
 
        {showAddToCartBtn(showAddToCartButton)}
 
        {showRemoveButton(showRemoveProductButton)}
 
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
    </FadeInSection>
  );
};
 
export default CardHome;