import React, { useEffect, useState } from 'react';
import Layoat from './Layoat';
import { read, listRelated } from './ApiCore';
import CartViewProduct from './CartViewProduct';
import RelatedCard from './RelatedCard';


const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatdeProduct, setRelatdeProduct] = useState([]);
    const [error, setError] = useState(false);


    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                //fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatdeProduct(data);
                    }
                });
            }
        });
    };


    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId);
    }, [props]);

    return(
        <Layoat title={product && product.name} description="" className="container-fluid">
            <div className="row">
                <div className="productinview">
                    {product && product.description && <CartViewProduct product={product} showViewProductButton={false} />}
                </div>
                <div>
                <h3 className="mb-2">Related Products</h3>
                <br />
                <div className="mb-3" style={{display: 'flex', flexWrap: 'wrap'}}>
                    {relatdeProduct.map((p, i) => (
                        <RelatedCard key={i} product={p}/>
                    ))}
                    </div>
                </div>
            </div>

        </Layoat>
    );
};



export default Product;