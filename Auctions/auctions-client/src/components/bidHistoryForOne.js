import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import 'bootstrap-icons/font/bootstrap-icons.css';

function BidHistoryForOneComponent() {
    let { itemId } = useParams();
    const [auctionList, setAuctionList] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/auctions/item/${itemId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            setAuctionList(response.data);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <div className="AuctionHistory my-4 mx-5">
            <Container>
                <h2 className='my-5'>Bid History</h2>
            </Container>
            {auctionList && auctionList.length > 0 ? (
                <Container>
                    <Row className="justify-content-md-center">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>price</th>
                                    <th>Bid Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auctionList.map((val, index) => (
                                    <tr key={index}>
                                        <td>{val.price}</td>
                                        <td>{val.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            ) : (
                <h4 className="mx-5">No History Listing</h4>
            )}
        </div>
    );
}

export default BidHistoryForOneComponent;
