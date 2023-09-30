import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


export default NewAuctionComponent;


function NewAuctionComponent() {
    // const [auctionList, setAuctionList] = useState([]);

    const shouldNavigate = true;
    const navigate = useNavigate();
    const navigateToHome = () => {
        if (shouldNavigate) {
            navigate('/');
        }
    }

    const [sellerEmail, setSellerEmail] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [initialPrice, setInitialPrice] = useState('');
    const [itemNameExists, setItemNameExists] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/auctions").then((response) => {
            var itemName = response.data.map((auction) => auction.itemName);
            setItemNameExists(itemName);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const validationSchema = Yup.object().shape({
        sellerEmail: Yup
            .string()
            .email('Invalid email format')
            .required('Seller email is required'),
        itemName: Yup
            .string()
            .min(2, 'Item name must be at least 2 characters')
            .max(100, 'Item name must not exceed 100 characters')
            .matches(
                /^[a-zA-Z0-9 ./,_()-]*$/,
                'Item name must only contain uppercase, lowercase, digits, spaces, and: ./,_()-'
            )
            .test('unique-item-name', 'Item name already exists', (value) => {
                // Check if the item name exists in itemNameExists
                // return !itemNameExists.includes(value);
                return !itemNameExists.some((existingName) =>
                    existingName.toLowerCase() === value.toLowerCase()
                );
            })
            .required('Item name is required'),
        itemDescription: Yup
            .string()
            .min(2, 'Item description must be at least 2 characters')
            .max(10000, 'Item description must not exceed 10,000 characters')
            .required('Item description is required'),
        initialPrice: Yup
            .number()
            .positive('Initial price must be greater than 0')
            .required('Initial price is required')
            .test('is-decimal', 'New price must have up to two decimal places', (value) => {
                // Check if the value is a valid decimal with up to two decimal places
                return /^\d+(\.\d{0,2})?$/.test(value);
            }),
    });

    const addAuction = () => {
        validationSchema
            .validate(
                {
                    sellerEmail,
                    itemName,
                    itemDescription,
                    initialPrice,
                },
                { abortEarly: false } // Collect all validation errors, not just the first one
            )
            .then(() => {
                // Validation passed; you can make the Axios POST request here
                Axios.post("http://localhost:3001/auctions", {
                    sellerEmail,
                    itemName,
                    itemDescription,
                    lastPrice: parseFloat(initialPrice),
                    lastBidderEmail: null,
                })
                    .then((response) => {
                        // Handle the response if needed
                        console.log(response.data);
                    })
                    .catch((error) => {
                        // Handle errors
                        console.error(error);
                    });
            })
            .catch((validationErrors) => {
                // Validation failed; handle the errors
                console.error(validationErrors.errors);
            });
    };

    return (
        <div className='form my-4' >
            <Container>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSellerEmail">
                            <Form.Label className="text-left">Seller Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="sellerEmail"
                                value={sellerEmail}
                                onChange={(e) => setSellerEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                Required, please provide a valid email.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemName">
                            <Form.Label>Item Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Item Name"
                                name="itemName"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)} />
                            <Form.Text className="text-muted">
                                Required, 2-100 characters, only uppercase, lowercase, digits, spaces and: ./,_()-.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemDescription">
                            <Form.Label>Item Description:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Item Description"
                                name="itemDescription"
                                value={itemDescription}
                                onChange={(e) => setItemDescription(e.target.value)} />
                            <Form.Text className="text-muted">
                                Required, 2-10000 characters.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formInitialPrice">
                            <Form.Label>Initial Price:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Initial Price"
                                name="initialPrice"
                                value={initialPrice}
                                onChange={(e) => setInitialPrice(e.target.value)} />
                            <Form.Text className="text-muted">
                                Required, must higher than 0.
                            </Form.Text>
                        </Form.Group>

                        <Button onClick={addAuction}>Submit</Button>
                        <Button className='mx-5' variant='warning' onClick={navigateToHome}>Cancel</Button>
                    </Form>
                </Row>
            </Container>
        </div >
    );
}

// FIXME: display error/sucessfully message as modal
