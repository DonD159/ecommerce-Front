import React, { useEffect, useState } from 'react';
import Layoat from './Layoat';
import {getProducts} from './ApiCore';
import CardHome from './CardHome';
import Search from './Search';
import { Link,useHistory } from 'react-router-dom';

const Home = () => {
    
    const [productBySell, setProductBySell] = useState([]);
    const [error, setError] = useState(false);
    const history = useHistory();

    const loadproductBySell = () => {
        getProducts('sold').then(data =>{
            if(data.error){
                setError(data.error);
            } else {
                setProductBySell(data);
            }
        });
    };



    useEffect(() =>{
        loadproductBySell();
    }, []);


    const handleChange = (value) => {
        history.push(`/${value}`);
      }


    return(
        <Layoat title="Home page" description="" className="container-fluid pagesize">
            <Search />
            <h1 className="mb-4">Best Sellers</h1>
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
                <h6><span>{productBySell.length} Products</span></h6>
            </div>

                
            <div className="row" style={{marginLeft: "0",marginRight: "-26px"}}>
                {productBySell.map((product, i) => (
                    <div key={i} className="col-3 mb-3">
                        < CardHome product={product} />
                    </div>
                ))}
            </div>
        </Layoat>
    );
};

export default Home;
