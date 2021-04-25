import React, { useEffect, useState } from "react";
import Layoat from "./Layoat";
import { getProducts, getCategories } from "./ApiCore";
import CardHome from "./CardHome";
import Search from "./Search";
import { Link, useHistory } from "react-router-dom";
import imgbaner from "../img/originals-ss21-ivypark-launch-clp-1-masthead-d_tcm221-633711.jpg";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();

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

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadproductBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadproductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    init();
    loadproductByArrival();
    loadproductBySell();
  }, []);

  const handleChange = (value) => {
    history.push(`/${value}`);
  };

  return (
    <Layoat title="Home" description="" className="container-fluid pagesize">
      <Search />

      <div className="baner">
        <img
          src={imgbaner}
          className="img"
        ></img>
        <div className="Position">
          <p className="textBaner">
            Your park is your imagination. Make it a wonderland.
          </p>
          {productByArrival.slice(0, 1).map((product, i) => (
            <Link key={i} to={`product/${product._id}`}>
              <button className="shopnowbtn">
                SHOP NOW{" "}
                <BsArrowRight
                  style={{ fontSize: "30px", marginLeft: "40px" }}
                />
              </button>
            </Link>
          ))}
        </div>
      </div>
      <FadeInSection>
        <div className="Relevance">
          <h6>Sort by Relevance</h6>
          <select
            className="form-select-sm mb-5"
            onChange={(event) => handleChange(event.target.value)}
          >
            <option>Select</option>
            <option value="newarrivals">New Arrivals</option>
            <option value="bestsellers">Best Sellers</option>
          </select>
        </div>
      </FadeInSection>

      <div className="lengthArticles">
        <h6>
          <span>{productByArrival.length} Products</span>
        </h6>
      </div>

      <FadeInSection>
        <div className="row">
          {productByArrival.map((product, i) => (
            <div
              key={i}
              className="col-sm-6 col-md-4 col-lg-3 mt-5"
            >
              <CardHome product={product} />
            </div>
          ))}
        </div>
      </FadeInSection>
    </Layoat>
  );
};

export default Home;
