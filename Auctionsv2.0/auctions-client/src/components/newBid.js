import React, { useState } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
export default NewBidComponent;


function NewBidComponent({ newBid, onClose }) {
    const { id, sellerEmail, lastPrice, itemName, itemDescription } = newBid;
    const [lastBidderEmail, setLastBidderEmail] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const validationSchema = Yup.object().shape({
        newPrice: Yup
            .number()
            .positive('New price must be greater than 0')
            .required('New price is required')
            .test('is-decimal', 'New price must have up to two decimal places', (value) => {
                // Check if the value is a valid decimal with up to two decimal places
                return /^\d+(\.\d{0,2})?$/.test(value);
            }),
        lastBidderEmail: Yup
            .string()
            .email('Invalid email format')
            .required('Bidder email is required'),
    });

    const placeBid = (id) => {
        if (newPrice < lastPrice) {
            console.error("New price must be higher than the last price.");
            setNewPrice(parseFloat(lastPrice) + 10);
            return;
        }
        validationSchema
            .validate(
                {
                    newPrice,
                    lastBidderEmail,
                },
                { abortEarly: false } // Collect all validation errors, not just the first one
            )
            .then(() => {
                Axios.patch(`http://localhost:3001/auctions/${id}`, {
                    lastBidderEmail: lastBidderEmail,
                    lastPrice: newPrice,
                },
                    {
                        headers: {
                            accessToken: sessionStorage.getItem("accessToken"),
                        },
                    }
                )
                    .then((response) => {
                        if (response.data.error) {
                            alert(response.data.error);
                        }
                        // Handle the response if needed
                        console.log(response.data);
                        onClose();
                    })
                    .catch((error) => {
                        // Handle errors
                        alert(error);
                    });
            })
            .catch((validationErrors) => {
                // Validation failed; handle the errors
                alert(validationErrors.errors);
            });
    };

    return (
        <div className='form my-4'>
            <Container><h2 className='my-4'>Place your bid</h2></Container>

            <Container>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formId">
                            <Form.Label className="text-left">Auction ID:</Form.Label>
                            <Form.Control
                                type="number"
                                name="id"
                                value={id}
                                readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formSellerEmail">
                            <Form.Label className="text-left">Seller Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="sellerEmail"
                                value={sellerEmail}
                                readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemName">
                            <Form.Label className="text-left">Item Name:</Form.Label>
                            <Form.Control
                                type="email"
                                name="itemName"
                                value={itemName}
                                readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemDescription">
                            <Form.Label className="text-left">Item Description:</Form.Label>
                            <Form.Control
                                type="email"
                                name="itemDescription"
                                value={itemDescription}
                                readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLastPrice">
                            <Form.Label className="text-left">Last Price:</Form.Label>
                            <Form.Control
                                type="email"
                                name="lastPrice"
                                value={lastPrice}
                                readOnly />
                        </Form.Group>

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

                        <Form.Group className="mb-3" controlId="formLastBidderEmail">
                            <Form.Label className="text-left">Seller Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="lastBiderEmail"
                                value={lastBidderEmail}
                                onChange={(e) => setLastBidderEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                Required, please provide a valid email.
                            </Form.Text>
                        </Form.Group>

                        <Button onClick={() => {
                            placeBid(id); // Place the bid
                        }}>Submit</Button>

                        <Button variant="warning" className="mx-5" onClick={() => {
                            onClose();
                        }}>Cancel</Button>

                    </Form>
                </Row>
            </Container>
        </div>
    );
}

//FIXME: doest compare the price for the first bid

