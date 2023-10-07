const { Auction } = require('../models');
const validator = require('validator');
const itemsController = require('./items.controller');

module.exports = {
    findAll: async (req, res) => {
        await Auction.findAll()
            .then((auctions) => {
                console.log(auctions);
                res.json(auctions).status(200);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Controllers: Internal Server Error' });
            })
    },
    addAuction: async (req, res) => {
        try {
            const auction = req.body;
            // const userId = req.user.userId;

            if (auction.price < 0 || auction.price == null) {
                return res.status(400).send({ message: 'Controller: lastPrice must be entered and valid' });
            }

            // compare with lastPrice
            const lastPrice = await Auction.findAll({
                where: {
                    itemId: auction.itemId,
                },
                order: [['createdAt', 'DESC']],
                limit: 1, // Limit the result to one record
            }).price;

            console.log(lastPrice);
            if (lastPrice === null) {
                lastPrice = await itemsController.findOneItemById(auction.itemId);
            }

            if (auction.price < lastPrice) {
                return res.status(400).send({ message: 'Controller: Your price must be higher than lastPrice' });
            }

            // auction.userId = userId;
            const addAuction = await Auction.create(auction);
            res.json(addAuction).status(201);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    findOneByAuctionId: async (req, res) => {
        const id = req.params.id;
        await Auction.findByPk(id)
            .then((auction) => {
                res.json(auction).status(200);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Controllers: Internal Server Error' });
            })
    },
    findOneByItemId: async (req, res) => {
        const id = req.params.id;
        await Auction.findAll({
            where: {
                itemId: id,
            },
            order: [['createdAt', 'DESC']],
        })
            .then((auctions) => {
                res.json(auctions).status(200);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Controllers: Internal Server Error' });
            })
    },
}
