import React from 'react';
import {API} from '../config';


const ShowImage = ({item, url}) => (
    <div className="product-img">
        <img 
            src={`${API}/${url}/photo/${item._id}`} 
            alt={item.name} 
            className="mb-4" 
            style={{maxHeight: '100%', maxWidth: '45%', marginLeft: '60px', marginTop: '19px'}} 
        />
    </div>

);



export default ShowImage;