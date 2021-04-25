import React from 'react';
import Menu from './Menu';
import '../Styles.css';

const Layoat = ({ title = 'Title', description = 'Description', className, children }) => 
<div>
    <Menu />
    <div className="jumbotron">
        <div className="titlejumbotron">
            <h2 className="display-4 title"><h2 data-text={title}>{title}</h2></h2>
            <p className="lead">{description}</p>
        </div>
    </div>
    <div className={className}>{children}</div>
</div>
export default Layoat
