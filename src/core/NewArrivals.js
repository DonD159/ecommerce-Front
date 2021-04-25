import React, { useEffect, useState } from 'react';
import Layoat from './Layoat';
import {getProducts} from './ApiCore';
import CardHome from './CardHome';
import Search from './Search';
import { Link,useHistory } from 'react-router-dom';

const Home = () => {

    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);
    const history = useHistory();


    const loadproductByArrival = () => {
        getProducts('createdAt').then(data =>{
            if(data.error){
                setError(data.error);
            } else {
                setProductByArrival(data);
            }
        });
    };



    useEffect(() =>{
        loadproductByArrival();
    }, []);


    const handleChange = (value) => {
        history.push(`/${value}`);
      }


    return(
        <Layoat title="Home page" description="" className="container-fluid pagesize">
            <Search />
            <h1 className="mb-4">New Arrivals</h1>
            <br />
            <div className="Relevance">
                <h6>Sort by Relevance</h6> 
                <select className="form-select-sm mb-5" onChange={event => handleChange(event.target.value)}>
                    <option>Select</option>
                    <option value="newarrivals">New Arrivals</option>
                    <option value="bestsellers">Best Sellers</option>
                </select>
            </div>


            <div className="lengthArticles">
                <h6><span>{productByArrival.length} Products</span></h6>
            </div>


            <div className="row">
                {productByArrival.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        < CardHome product={product} />
                    </div>
                ))}
            </div>
        </Layoat>
    );
};

export default Home;
