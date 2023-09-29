import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {
  // const []
  const [auctionList, setAuctionList] = useState([]);
  const [sellerEmail, setSellerEmail] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [initialPrice, setInitialPrice] = useState('');
  // const [lastBidderEmail, setLastBidderEmail] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:3001/api/auctions").then((response) => {
      setAuctionList(response.data);
      console.log(response.data);
    });
  }, []);

  const addAuction = () => {
    Axios.post("http://localhost:3001/api/auctions", {
      sellerEmail: sellerEmail,
      itemName: itemName,
      itemDescription: itemDescription,
      lastPrice: initialPrice,
    });

    setAuctionList([...auctionList, {
      sellerEmail: sellerEmail,
      itemName: itemName,
      itemDescription: itemDescription,
      lastPrice: initialPrice,
      lastBidderEmail: null
    },
    ]);

  };

  return (
    <div className="App">
      <h1 className="my-4">Auction List</h1>
      <Button variant="primary" className="mb-4" onClick={() => { }}>Add auction</Button>
      <div className='table'>
        <Container>
          <Row className="justify-content-md-center">

            <Table bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>sellerEmail</th>
                  <th>itemName</th>
                  <th>itemDescription</th>
                  <th>lastPrice</th>
                  <th>lastBidderEmail</th>
                  <th>Bid</th>
                </tr>
              </thead>
              <tbody>
                {auctionList.map((val, index) => (
                  <tr key={index}>
                    <td>{val.id}</td>
                    <td>{val.sellerEmail}</td>
                    <td>{val.itemName}</td>
                    <td>{val.itemDescription}</td>
                    <td>{val.lastPrice}</td>
                    <td>{val.lastBidderEmail}</td>
                    <td><Button variant="warning" onClick={() => { }}>Bid</Button></td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
      <div className='form my-4'>
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

              <button onClick={addAuction}>Submit</button>
            </Form>
          </Row>
        </Container>
      </div>

    </div>
  );
}

export default App;
