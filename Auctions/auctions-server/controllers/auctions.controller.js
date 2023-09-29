const { Auction } = require('../models');
const validator = require('validator');

module.exports = {
    findAll: async (req, res) => {
        try {
            const auctions = await Auction.findAll();
            console.log(auctions);
            res.json(auctions).status(200);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    addAuction: async (req, res) => {
        try {
            const auction = req.body;
            if (validateDataAdd(auction, req, res)) {
                const addAuction = await Auction.create(auction);
                res.json(addAuction).status(201);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    findOneById: async (req, res) => {
        try {
            const id = req.params.id;
            const auction = await Auction.findByPk(id);
            res.json(auction).status(200);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    bid: async (req, res) => {
        const id = req.params.id;
        const newBid = req.body;
        let currentPrice = 0;
        try {
            const auction = await Auction.findByPk(id);
            if (auction == null) {
                return res.status(400).json({ message: `Controllers: Auction with id ${id} doesn't exist.` });
            }
            // console.log(auction);
            currentPrice = auction.lastPrice;
            console.log(currentPrice);

            if (newBid.lastPrice < currentPrice) {
                return res.status(400).json({ message: `Controllers: bid must higher than lastBidPrice ${currentPrice}.` });
            }
            if (!validator.isEmail(newBid.lastBidderEmail)) {
                return res.status(400).json({ message: 'Controllers: lastBidderEmail must be valid.' });

            }
            auction.lastPrice = newBid.lastPrice;
            auction.lastBidderEmail = newBid.lastBidderEmail;
            const newAuction = auction.save();
            res.status(200).json(newBid);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    }
}

// validation when add a new record
function validateDataAdd(auction, req, res) {

    const { sellerEmail, itemName, itemDescription, lastPrice, lastBidderEmail } = auction;


    var itemNamePattern = /^[a-zA-Z0-9 ./,_()-]*$/;

    // required, must look like a valid email
    if (validator.isEmpty(sellerEmail) || !validator.isEmail(sellerEmail)) {
        res.status(400).send({ message: 'Controllers: sellerEmail must be entered and valid' });
        return false;
    }

    // required, 2-100 characters, only uppercase, lowercase, digits, spaces and: ./,_()-
    if (validator.isEmpty(itemName) || itemName.length < 2 || itemName.length > 100 || !itemNamePattern.test(itemName)) {
        res.status(400).send({ message: 'Controller: ItemCode must between 2 and 20 characters long, be made up of letters, digits, dashes, dots or spaces' });
        return false;
    }

    // required, 2-10000 characters
    if (validator.isEmpty(itemDescription) || itemDescription.length < 2 || itemDescription.length > 10000) {
        res.status(400).send({ message: 'Controller: itemDescription must between 1 and 200 characters long' });
        return false;
    }

    // required, 0 or higher
    if (lastPrice < 0) {
        res.status(400).send({ message: 'Controller: lastPrice must be entered and valid' });
        return false;
    }

    // may be NULL (initially) or a valid email
    if (lastBidderEmail !== null && !validator.isEmail(lastBidderEmail)) {
        res.status(400).send({ message: "Controllers: lastBidderEmail must be valid" });
        return false;
    }

    return { valid: true };

};

