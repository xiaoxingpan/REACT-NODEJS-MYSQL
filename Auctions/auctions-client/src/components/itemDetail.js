import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Container, Row, Form, Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


function ItemDetailComponent({ updateItem }) {

    let { itemId } = useParams();
    const [item, setItem] = useState({
        itemId: '',
        sellerEmail: '',
        itemName: '',
        itemDescription: '',
        initialPrice: '',
        endDate: '',
    });

    const renderButtons = () => {
        if (updateItem) {
            return (
                <>
                    <Button onClick={() => updateOneItem} > Update</Button >
                    <Button variant="warning" className="mx-5" onClick={() => navigateToItemList}>Cancel</Button>
                </>
            );
        }
        return null; // Don't render any buttons if updateItem is false
    };

    const navigate = useNavigate();
    const navigateToItemList = () => {
        navigate('/itemList');
    }

    const [sellerEmail, setSellerEmail] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [initialPrice, setInitialPrice] = useState('');
    const [endDate, setEndDate] = useState('');

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
        endDate: Yup.date()
            .required('End Date is required')
            .min(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 'End Date must be tomorrow or later'),
    });

    // FIXME: IF BID STARTED, CANNOT EDIT INITIAL PRICE
    // IF END DATE PASSED CAN NOT EDIT 
    const updateOneItem = () => {
        validationSchema
            .validate(
                {
                    sellerEmail,
                    itemName,
                    itemDescription,
                    initialPrice,
                    endDate,
                },
                { abortEarly: false } // Collect all validation errors, not just the first one
            )
            .then(() => {
                // Validation passed; you can make the Axios POST request here
                Axios.post("http://localhost:3001/items", {
                    sellerEmail,
                    itemName,
                    itemDescription,
                    initialPrice: parseFloat(initialPrice),
                    endDate,
                },
                    {
                        headers: {
                            accessToken: localStorage.getItem("accessToken"),
                        },
                    }
                ).then((response) => {
                    if (response.data.error) {
                        alert(response.data.error);
                    }
                    // Handle the response if needed
                    console.log(response.data);
                    alert("Sucessfully added!");
                    navigateToItemList();
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


    useEffect(() => {
        Axios.get(`http://localhost:3001/items/${itemId}`).then((response) => {
            setItem(response.data);
            console.log(response.data);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <div className='itemDetails'>
            <Container><h2 className='my-5'>Item Details</h2></Container>
            <Container>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formId">
                            <Form.Label className="text-left">Item ID:</Form.Label>
                            <Form.Control
                                type="number"
                                name="id"
                                value={item.itemId}
                                readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formSellerEmail">
                            <Form.Label className="text-left">Seller Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="sellerEmail"
                                defaultValue={item.sellerEmail}
                                readOnly={!updateItem}
                                onChange={(e) => setSellerEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemName">
                            <Form.Label className="text-left">Item Name:</Form.Label>
                            <Form.Control
                                type="email"
                                name="itemName"
                                defaultValue={item.itemName}
                                readOnly={!updateItem}
                                onChange={(e) => setItemName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemDescription">
                            <Form.Label className="text-left">Item Description:</Form.Label>
                            <Form.Control
                                type="email"
                                name="itemDescription"
                                defaultValue={item.itemDescription}
                                readOnly={!updateItem}
                                onChange={(e) => setItemDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLastPrice">
                            <Form.Label className="text-left">Initial Price:</Form.Label>
                            <Form.Control
                                type="email"
                                name="initialPrice"
                                defaultValue={item.initialPrice}
                                readOnly={!updateItem}
                                onChange={(e) => setInitialPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLastPrice">
                            <Form.Label className="text-left">End Date:</Form.Label>
                            <Form.Control
                                type="email"
                                name="initialPrice"
                                value={item.endDate}
                                readOnly
                                onChange={(e) => setEndDate(e.target.value)} />
                        </Form.Group>

                        {/* Conditionally render buttons */}
                        {renderButtons()}
                    </Form>
                </Row>
            </Container>
        </div >
    )
}

export default ItemDetailComponent;