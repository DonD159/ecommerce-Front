
import React, { useState, useEffect } from 'react';
import Layoat from './Layoat';
import { Link } from 'react-router-dom';
import { getCart } from './CardHelpers';
import Card from './Card';
import Checkout from './Checkout';
 
const Cart = () => {
  const [items, setItems] = useState([]);
  // const [cartSize, setCartSize] = useState([]);
  const [run, setRun] = useState(false);
 
  useEffect(() => {
    setItems(getCart());
  }, [run]);
 
  const showItems = items => {
    return (
      <>
        <h2>Your Cart Has {`${items.length}`} Items</h2>
        <hr />
        <br />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
            // changeCartSize={changeCartSize}
          />
        ))}
      </>
      
    );
  };
 
  const noItemsMessage = () => (
    <h2>
      Your Cart is empty. <br />
      <Link to="/shop"> Continue shopping. </Link>
    </h2>
  );
 
  return (
    <Layoat title="Shopping Cart" description="Checkout now!" className="container-fluid">
      <div className="row">
        <div className="col-sm-5 col-md-4 col-lg-4">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
        <div className="col-sm-5 col-md-4 col-lg-4" style={{marginLeft: 'auto', marginRight: '229px'}}>
          <h2 className="mb-3">Your Cart Summary</h2>
          <hr />
          <br />
          <Checkout product={items} />
        </div>
      </div>
    </Layoat>
  );
};
 
export default Cart;