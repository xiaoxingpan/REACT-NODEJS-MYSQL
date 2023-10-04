import React, { useEffect, useState } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Table, Button, } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

function ItemListComponent() {

    const [itemList, setItemList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3001/items").then((response) => {
            setItemList(response.data);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const navigateToDetail = (itemId) => {
        navigate(`/item/${itemId}`);
    }
    const navigateToDelete = (itemId) => {
        navigate(`/item/${itemId}`);
    }
    const navigateToAddItem = () => {
        navigate('/addItem');
    }
    const navigateToUpdate = (itemId) => {
        navigate(`/updateItem/${itemId}`);
    }


    return (
        <div className="ItemList my-4">
            <Container>
                <Button variant="info" className="my-5" onClick={navigateToAddItem}>Add Item</Button>
                <Row className="justify-content-md-center">
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>sellerEmail</th>
                                <th>itemName</th>
                                <th>itemDescription</th>
                                <th>initialPrice</th>
                                <th>lastPrice</th>
                                <th>endDate</th>
                                <th>operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList.map((val, index) => (
                                <tr key={index}>
                                    <td>{val.itemId}</td>
                                    <td>{val.sellerEmail}</td>
                                    <td>{val.itemName}</td>
                                    <td>{val.itemDescription}</td>
                                    <td>{val.initialPrice}</td>
                                    <td></td>
                                    <td>{val.endDate}</td>
                                    <td>
                                        <i className="bi bi-pencil-square" onClick={() => navigateToUpdate(val.itemId)}></i> || <i className
                                            ="bi bi-trash3-fill" onClick={() => navigateToDelete(val.itemId)}></i> || <i className
                                                ="bi bi-bag-heart-fill" onClick={() => navigateToDetail(val.itemId)}></i>
                                    </td>
                                </tr >
                            ))
                            }
                        </tbody >
                    </Table >
                </Row >
            </Container >
        </div >
    )
}

export default ItemListComponent;