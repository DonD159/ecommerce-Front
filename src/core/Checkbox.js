import React, { useEffect, useState } from 'react';


const Checkbox = ({categories, handelFilters}) => {
    const [checked, setChecked] = useState([]);


    const handelToggle = c => () => {
        const currentCatrgoryId = checked.indexOf(c);
        const newCheckedCatrgoryId = [...checked];
        if (currentCatrgoryId === -1) {
            newCheckedCatrgoryId.push(c);
        } else {
            newCheckedCatrgoryId.splice(currentCatrgoryId, 1);  
        }
        //console.log(newCheckedCatrgoryId);
        setChecked(newCheckedCatrgoryId);
        handelFilters(newCheckedCatrgoryId);
    }


    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input 
                onChange={handelToggle(c._id)} 
                value={checked.indexOf(c._id === -1)} 
                type="checkbox" 
                className="form-check-input" 
            />
            <label className="form-check-label ms-2 mb-1" style={{color: 'white'}}>{c.name}</label>
        </li>
        
    ));
    
};



export default Checkbox;