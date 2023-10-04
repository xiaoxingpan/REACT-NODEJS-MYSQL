import React from 'react';
import ItemDetailComponent from '../components/itemDetail';
import NewBidComponent from '../components/newBid';
import BidHistoryForOneComponent from '../components/bidHistoryForOne';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function ItemDetailBid() {
    return (
        <div className='itemDetailBid'>
            <Container>
                <Row>
                    <Col className='itemDetails mx-5'>
                        <ItemDetailComponent updateItem={false} />
                    </Col>
                    <Col className='bid mx-5'>
                        <NewBidComponent />
                    </Col>
                </Row>
            </Container>
            <Container>
                <BidHistoryForOneComponent />
            </Container>
        </div>
    )
}

export default ItemDetailBid;