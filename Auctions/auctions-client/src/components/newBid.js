import React, { useState, useEffect } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
export default NewBidComponent;

function NewBidComponent({ newBid, onClose }) {

    let { itemId } = useParams();
    const [newPrice, setNewPrice] = useState('');
    const [lastPrice, setLastPrice] = useState('');

    // find lastPrice
    useEffect(() => {
        Axios.get(`http://localhost:3001/auctions/item/${itemId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                }
                if (response.data.length > 0) {
                    // If there is data in the response (array not empty)
                    setLastPrice(response.data[0].price);
                    console.log(response.data[0]);
                } else {
                    // If there is no data in the response, fetch initialPrice from another endpoint
                    Axios.get(`http://localhost:3001/items/${itemId}`, {
                        headers: {
                            accessToken: localStorage.getItem("accessToken"),
                        },
                    })
                        .then((itemResponse) => {
                            if (response.data.error) {
                                alert(response.data.error);
                            }
                            setLastPrice(itemResponse.data.initialPrice);
                        })
                        .catch((itemError) => {
                            console.error(itemError);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [itemId]); // Include itemId as a dependency to trigger the effect when it changes

    const validationSchema = Yup.object().shape({
        newPrice: Yup
            .number()
            .positive('New price must be greater than 0')
            .required('New price is required')
            .test('is-decimal', 'New price must have up to two decimal places', (value) => {
                // Check if the value is a valid decimal with up to two decimal places
                return /^\d+(\.\d{0,2})?$/.test(value);
            }),
    });

    const placeBid = (itemId) => {
        // var userId = localStorage.getItem("userId");
        if (newPrice < lastPrice) {
            console.error("New price must be higher than the last price.");
            setNewPrice('');
            return;
        }
        validationSchema
            .validate(
                { newPrice, },
                { abortEarly: false } // Collect all validation errors, not just the first one
            )
            .then(() => {
                Axios.post('http://localhost:3001/auctions/', {
                    price: newPrice,
                    itemId: itemId,
                    // userId: userId,
                },
                    {
                        headers: {
                            accessToken: localStorage.getItem("accessToken"),
                        },
                    }
                )
                    .then((response) => {
                        if (response.data.error) {
                            console.log(response.data.error);
                        }
                        // Handle the response if needed
                        console.log(response.data);
                        window.location.reload();
                    })
                    .catch((error) => {
                        // Handle errors
                        console.log(error);
                    });
            })
            .catch((validationErrors) => {
                // Validation failed; handle the errors
                alert(validationErrors.errors);
            });
    };
    return (
        <div className='newBid my-5 mx-5'>
            <Container><h2 className='my-5'>Place your bid</h2></Container>
            <Container>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formNewPrice">
                            <Form.Label>New Price:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter New Price"
                                name="newPrice"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)} />
                            <Form.Text className="text-muted">
                                Required, must higher than the last price.
                            </Form.Text>
                        </Form.Group>
                        <Button onClick={() => placeBid(itemId)}>Submit</Button>
                        <Button variant="warning" className="mx-5" onClick={() => setNewPrice('')}>Cancel</Button>
                    </Form>
                </Row>
            </Container>
        </div>
    );

}

//FIXME: doest compare the price for the first bid

