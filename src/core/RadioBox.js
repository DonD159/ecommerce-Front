import React, { useEffect, useState } from 'react';

const RadioBox = ({prices, handelFilters }) => {
    const [value, setValue] = useState(0);

    const handelChange = (e) => {
        handelFilters(e.target.value);
        setValue(e.target.value);
    }
    
    return prices.map((p, i) => (
        <div key={i}>
            <input 
                onChange={handelChange} 
                value={`${p._id}`} 
                name={p}
                type="radio"
                className="mr-2 ml-4" 
            />
            <label className="form-check-label ms-2 mb-1" style={{color: 'white'}}>{p.name}</label>

        </div>
        
    ));
};


export default RadioBox;