import React, { useEffect, useState } from 'react';
import { getCategories, list } from './ApiCore';
import CardSearch from './CardSearch';


const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });


const { categories, category, search, results, searched } = data;


    const loadCategories = () =>{
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData ({...data, categories: data});
            }
        });
    };


    useEffect(() => {
        loadCategories();
    }, []);


    const searchData = () => {
      // console.log(search, category);
      if(search) {
          list({ search: search || undefined, category: category })
          .then(response => {
              if(response.error) {
                  console.log(response.error);
              } else {
                  setData({ ...data, results: response, searched: true });
              }
          })
      }
    };


    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };


    const handelChange = name => e => {
        setData({ ...data, [name]: e.target.value, searched: false });
    };


    const searchMassage = (searched, results) => {
         if (searched && results.length > 0) {
             return `Found ${results.length} Products`;
         }
         if (searched && results.length < 1) {
            return 'No Found Products ';
        }
    };


    const searchedProducts = (results = []) => {
       return (
            <div>
                <h3 className="mt-1 mb-4 text-center bg">
                    {searchMassage(searched, results)}
                </h3>
                <div className="row">
                <div className="container-fluid col-4">
                    {results.map((product, i) => (
                        <div className="searchproduct">
                            <CardSearch key={i} product={product} />
                        </div>
                    ))}
                    
                </div>
                </div>
            </div>
       ) 
    }


 const searchForm = () => (
    <form onSubmit={searchSubmit}>
       <span className="input-group-text mb-5 col-sm-3 col-md-6 col-lg-7 container searchpanel">
           <div className="input-group inputsearch">
               <div className="input-group-prepend">
                   <select className="btn mr-2" onChange={handelChange("category")}>
                       <option value="All">All</option>
                            {categories.map((c,i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                   </select>
               </div>
                <input 
                    type="search" className="form-control" 
                    onChange={handelChange("search")} 
                    placeholder="Search product.."
                />
           </div>
           <div className="btn input-group-prepend" style={{border: 'none'}}>
               <button className="input-group-text">Search</button>
           </div>
       </span>
    </form>  
    );

    // col-md-13 col-lg-13
    return (
        <div className="row">
            <div className="container">
                {searchForm()}
            </div>

            <div className="container-fluid col-9 mb-5">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;