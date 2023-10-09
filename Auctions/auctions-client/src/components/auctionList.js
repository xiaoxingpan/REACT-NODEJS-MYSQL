import React, { useEffect, useState } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Table, Button, } from 'react-bootstrap';
import NewBidComponent from '../components/newBid';

function AuctionListComponent() {
    const [auctionList, setAuctionList] = useState([]);
    const [showNewBidComponent, setShowNewBidComponent] = useState(false); // State to control NewBidComponent visibility
    const [newBid, setNewBid] = useState(null);

    const showOneAuction = (val) => {
        setNewBid(val);
        setShowNewBidComponent(true);
    };

    // const updateAuctionList = async () => {
    //     try {
    //         const response = await Axios.get("http://localhost:3001/auctions");
    //         setAuctionList(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        Axios.get("http://localhost:3001/auctions").then((response) => {
            setAuctionList(response.data);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // useEffect(() => {
    //     fetch("http://localhost:3000/auctions")
    //         .then((res) => {
    //             if (!res.ok) {
    //                 console.log(res);
    //                 throw new Error("Network response was not work");
    //             }
    //             return res.json();
    //         }).then((response) => {
    //             console.log(response.status);
    //             setAuctionList(response);
    //         }).catch(error => {
    //             // Handle errors
    //             console.log(error);
    //         });;
    // }, []);
    return (
        <div className="AuctionList my-4">
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
                                    <td><Button variant="warning" onClick={() => showOneAuction(val)}>Bid</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            {/* Conditionally render NewBidComponent */}

            {showNewBidComponent && (
                <NewBidComponent
                    newBid={newBid} // Pass the selected auction id as a prop
                    onClose={() => setShowNewBidComponent(false)}
                    updateAuctionList={() => {
                        // Implement the logic to fetch and update the auction list here
                        Axios.get("http://localhost:3001/auctions")
                            .then((response) => {
                                setAuctionList([response.data]);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                />
            )}
        </div>
    )
}
export default AuctionListComponent;

// FIXME:list updated only refresh the page!
// FIXME:pagination