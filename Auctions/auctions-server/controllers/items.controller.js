const { Item } = require('../models');
const validator = require('validator');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');

module.exports = {
    findAllItems: async (req, res) => {
        const items = await Item.findAll()
            .then((items) => {
                console.log(items);
                res.json(items).status(200);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Controllers: Internal Server Error' });
            })
    },
    addItem: async (req, res) => {
        try {
            const item = req.body;
            if (validateDataAdd(item, req, res)) {
                const newItem = await Item.create(item);
                res.json(newItem).status(201);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    findOneItemById: async (req, res) => {
        try {
            const itemId = req.params.id;
            const item = await Item.findByPk(itemId);
            res.json(item).status(200);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    deleteOneItemById: async (req, res) => {
        try {
            const itemId = req.params.id;
            const item = await Item.destroy({
                where: {
                    itemId: itemId
                }
            });
            res.json(item).status(200);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    },
    updateOneItemById: async (req, res) => {
        const id = req.params.id;
        const updateItem = req.body;
        try {
            const item = await Item.findByPk(id);
            if (item == null) {
                return res.status(400).json({ message: `Controllers: Item with id ${id} doesn't exist.` });
            }

            // initialPrice can't change one bid started
            const response = await fetch(`http://localhost:3001/auctions/item/${id}`);

            if (response.status === 200) {
                const existAuction = await response.json();

                if (existAuction.length === 0) {
                    item.initialPrice = updateItem.initialPrice;
                } else {
                    return res.status(200).json({ message: 'Controllers: initialPrice can not be updated once the bid started' });
                }
                // FIXME: ENDDATE SHOULD BE LATEST BID CREATE DATE OR LATER
                // FIXME: CANNOT UPDATE ONCE ENDDATE PASSED
                item.sellerEmail = updateItem.sellerEmail;
                item.itemName = updateItem.itemName;
                item.itemDescription = updateItem.itemDescription;
                item.endDate = updateItem.endDate;

                if (validateDataAdd(item, req, res)) {
                    const updateItem = item.save();
                    res.status(200).json(item);
                }
            } else {
                return res.status(500).json({ message: 'Controllers: Internal Server Error' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Controllers: Internal Server Error' });
        }
    }
}

// validation when add a new record
function validateDataAdd(item, req, res) {

    const { sellerEmail, itemName, itemDescription, initialPrice, endDate } = item;

    // required, must look like a valid email
    if (validator.isEmpty(sellerEmail) || !validator.isEmail(sellerEmail)) {
        res.status(400).send({ message: 'Controllers: sellerEmail must be entered and valid' });
        return false;
    }

    // required, 2-100 characters, only uppercase, lowercase, digits, spaces and: ./,_()-
    if (validator.isEmpty(itemName) || !validator.isLength(itemName, { min: 2, max: 100 }) || !validator.matches(itemName, /^[a-zA-Z0-9 ./,_()-]*$/)) {
        res.status(400).send({ message: 'Controller: ItemCode must between 2 and 20 characters long, be made up of letters, digits, dashes, dots or spaces' });
        return false;
    }

    // required, 2-10000 characters
    if (validator.isEmpty(itemDescription) || !validator.isLength(itemDescription, { min: 2, max: 10000 })) {
        res.status(400).send({ message: 'Controller: itemDescription must between 1 and 200 characters long' });
        return false;
    }

    // required, 0 or higher
    if (initialPrice < 0) {
        res.status(400).send({ message: 'Controller: initialPrice must be entered and valid' });
        return false;
    }

    // FIXME: should be a date of tomorrow or later
    // const currentDate = new Date();
    // currentDate.setHours(0, 0, 0, 0);
    // const tomorrow = new Date(currentDate);
    // tomorrow.setDate(currentDate.getDate() + 1);
    // console.log(currentDate);

    // if (!validator.isDate(endDate) || new Date(endDate) < tomorrow) {
    //     res.status(400).send({ message: 'Controller: endDate should be a date of tomorrow or later' });
    //     return false;
    // }

    return { valid: true };

};