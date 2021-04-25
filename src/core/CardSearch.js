
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImageSearch from './ShowImageSearch';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './CardHelpers';

 
const CardSearch = ({
  c,
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
        <Link to={`/product/${product._id}`} className="viewSearch">
          <button className="btn btn-outline-primary" style={{fontSize:'10px',float: 'right', marginTop: '-32px'}}>View Product</button>
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
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
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
          className="btn btn-outline-danger mt-2 mb-2 " style={{marginRight: '-4px'}}
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <div className="cardsearch">
      <div style={{textAlign: 'center',fontWeight:'bold'}}>{product.name}</div>
      <p className="priceSearch" style={{color: 'rgb(255, 102, 0)',fontWeight: 'bold', marginTop: '7px'}}>US $ {product.price}</p>
      <ShowImageSearch item={product} url="product" />
        {showCartUpdateOptions(cartUpdate)}
 
        {showRemoveButton(showRemoveProductButton)}

        {showViewButton(showViewProductButton)} 
    </div>
  );
};
 
export default CardSearch;