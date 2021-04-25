import React from 'react';
import {API} from '../config';


const ShowImage = ({item, url}) => (
        <img 
            src={`${API}/${url}/photo/${item._id}`} 
            alt={item.name} 
        />

);



export default ShowImage;