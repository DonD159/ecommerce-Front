import React, { useEffect, useState } from "react";
import Layoat from "./Layoat";
// import CardShop from './CardShop';
import { getCategories, getFilterdProduct } from "./ApiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./Prices";
import {
  ProSidebar,
  Menu,
  SubMenu,
  MenuItem,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import CardHome from "./CardHome";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filterdResults, setFilterdResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFiltres) => {
    // console.log(newFiltres);
    getFilterdProduct(skip, limit, newFiltres).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilterdResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFiltres);
    getFilterdProduct(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilterdResults([...filterdResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handelFilters = (filters, filterBy) => {
    //console.log("SHOP " , filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy == "price") {
      let pricevalues = handelPrice(filters);
      newFilters.filters[filterBy] = pricevalues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handelPrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layoat
      title="Shop"
      description="Search and find"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <ProSidebar style={{ height: "auto", marginBottom: "48px" }}>
            <Menu iconShape="square">
              <SidebarHeader style={{
                  fontSize: "19px",
                  fontWeight: "600",
                  color: "rgb(255, 153, 0)",
                  padding: "8px 19px 14px"
                }}
              > 
                  Filter
              </SidebarHeader>
              <SubMenu title="Category">
                <div className="ms-5">
                  <Checkbox
                    categories={categories}
                    handelFilters={(filters) =>
                      handelFilters(filters, "category")
                    }
                  />
                </div>
              </SubMenu>
              {/* <SidebarHeader></SidebarHeader> */}
              <SubMenu title="Price range">
                <div>
                  <RadioBox
                    prices={prices}
                    handelFilters={(filters) => handelFilters(filters, "price")}
                  />
                </div>
              </SubMenu>
            </Menu>
          </ProSidebar>
        </div>
        <div className="col-12">
          <div className="row">
            {filterdResults.map((product, i) => (
              <div key={i} className="col-sm-1 col-md-2 col-lg-4 mb-5">
                <CardHome product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layoat>
  );
};

export default Shop;