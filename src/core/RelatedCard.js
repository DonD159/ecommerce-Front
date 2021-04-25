
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImageRelated from './ShowImageRelated';
import { updateItem } from './CardHelpers';

 
const Card = ({
  product,
  showViewProductButton = true,
  cartUpdate = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <ShowImageRelated item={product} url="product" />
        </Link>
      )
    );
  };
  
 
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
 
 
  const handleChange = productId => event => {
    setRun(!run);
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
  return (
    <>
      <div className="col-sm-2 col-md-2 col-lg-2 card imgcardhome mb-5">
        {shouldRedirect(redirect)}
        <br />
 
        {showViewButton(showViewProductButton)}
 
        {showCartUpdateOptions(cartUpdate)}

        <p style={{textAlign: 'center'}}>$ {product.price}</p>
      </div>
    
    </>
  );
};
 
export default Card;