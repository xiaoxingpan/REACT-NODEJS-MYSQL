import React from 'react';
import ItemDetailComponent from '../components/itemDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateItem() {

    return (
        <div><ItemDetailComponent updateItem={true} /></div>

    )
}


export default UpdateItem;