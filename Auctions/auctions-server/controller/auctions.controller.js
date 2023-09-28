const Auction = require("../model/auctions.model.js");

// Validate and create a auction
exports.create = (req, res) => {

    const validation = validateDataAdd(req.body);

    // Validate request
    if (!validation.valid) {
        // log.error('API', `Error Code: 400, Content is not valide!`);
        res.status(400).json({ error: validation.message });
        return;
    }

    // const duplicate = checkDuplicate(req.body.itemCode);

    // // check duplicate
    // if (duplicate.valid) {
    //     res.status(209).send({
    //         message:
    //             err.message || 'Controller: duplicate itemCode, please update if needed'
    //     });
    //     return;
    // }

    // Create a auction
    const newAuction = {
        sellerEmail: req.body.sellerEmail,
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        lastPrice: req.body.lastPrice,
        lastBidderEmail: req.body.lastBidderEmail || null,
    };

    // Save auction in the db
    Auction.create(newAuction, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Internal error occurred while creating the Record."
            });
        } else {
            res.status(201).send(data);
        }
    });

};

// Retrieve all auctions from the database
exports.findAll = (req, res) => {
    const validSortOrders = ["id", "itemName", "lastBidderEmail"];
    const sortOrder = req.query.sortOrder ? req.query.sortOrder : "lastBidderEmail"; //  sort by lastBidderEmail if no sortOrder provided

    if (!validSortOrders.includes(sortOrder)) {
        res.status(400).send({
            message: "Controller: Invalid sort order value."
        });
        return;
    }

    Auction.getAll(sortOrder, (err, data) => {
        if (err) {
            // log.error('API', `Error Code: 500, Error retrieving auction.`);
            res.status(500).send({
                message:
                    err.message || "Controller: Error occurred while retrieving records."
            });
        }
        else {
            res.status(200).send(data);
        }
    });
};

// Find a single auction with a code
exports.findOneById = (req, res) => {

    Auction.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "Controller: Not Found.") {
                //  log.error('API', `Error Code: 404, Not found auction with id ${req.params.id}.`);
                res.status(404).send({
                    message: `Controller: Not found auction with code ${req.params.id}.`
                });
            } else {
                // log.error('API', `Error Code: 500, Error retrieving auction with id ${req.params.id}.`);
                res.status(500).send({
                    message: 'Controller: Error occurred while retrieving auction with code' + req.params.id
                });
            }
        } else {
            res.status(200).send(data);
        }
    });

};

// Update a auction identified by the code in the request
exports.update = (req, res) => {

    const { lastPrice, lastBidderEmail } = req.body;
    const validation = validateDataUpdate(req.body, req.params.id, res);


    if (!validation.valid) {
        //  log.error('API', `Error Code: 400, Content is not valide!`);
        return res.status(400).json({ error: validation.message });
    }

    // console.log(req.body);
    // console.log(req.params.id);
    // console.log(req.body.lastPrice);


    Auction.updateById(
        req.params.id,
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    //    log.error('API', `Error Code: 404, Not found auction with id ${req.params.id}.`);
                    res.status(404).send({
                        message: `Controller: Not found auction with id ${req.params.id}.`
                    });
                } else {
                    //   log.error('API', `Error Code: 500, Error updating auction with id ${req.params.id}.`);
                    res.status(500).send({
                        message: 'Controller: Error occurred while updating auction with id' + req.params.id
                    });
                }
            } else {
                res.status(200).json(true);
            }
        }

    );
};

function validateDataAdd(auction) {

    const { sellerEmail, itemName, itemDescription, lastPrice, lastBidderEmail } = auction;

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var itemNamePattern = /^[a-zA-Z0-9 ./,_()-]*$/;

    // required, must look like a valid email
    if (sellerEmail === null || !emailPattern.test(sellerEmail)) {
        return { valid: false, message: 'Controller: sellerEmail must be valid' };
    }

    // required, 2-100 characters, only uppercase, lowercase, digits, spaces and: ./,_()-
    if (itemName === null || itemName.length < 2 || itemName.length > 100 || !itemNamePattern.test(itemName)) {
        return { valid: false, message: 'Controller: ItemCode must be unique, between 2 and 20 characters long, made up of letters, digits, dashes, dots or spaces' };
    }

    // required, 2-10000 characters
    if (itemDescription === null || itemDescription.length < 2 || itemDescription.length > 10000) {
        return { valid: false, message: 'Controller: itemDesc must be between 1 and 200 characters long' };
    }

    // required, 0 or higher
    if (lastPrice === null || lastPrice < 0) {
        return { valid: false, message: 'Controller: sellerEmail must be valid' };
    }

    // may be NULL (initially)
    if (lastBidderEmail !== null && !emailPattern.test(lastBidderEmail)) {
        return { valid: false, message: 'Controller: lastBidderEmail must be valid' };
    }

    return { valid: true };

};

function validateDataUpdate(auction, id, res) {

    const { lastPrice, lastBidderEmail } = auction;

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (lastBidderEmail === null || !emailPattern.test(lastBidderEmail)) {
        return { valid: false, message: 'Controller: lastBidderEmail must be valid' };
    }
    console.log(id);

    if (lastPrice === null || lastPrice < 0 || lastPrice < currentPrice) {
        return { valid: false, message: 'Controller: lastPrice should not be null and should over 0' };
    }

    var currentPrice = 0;
    console.log(currentPrice);
    console.log("error");

    // FIXME the new lastBid is higher than the existing lastBid (if not it rejects the bid with 400 http code)
    Auction.findLastBidById(
        id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return { valid: false, message: 'Controller: 404, Not found current lastPrice' };
                } else {
                    return { valid: false, message: 'Controller: Error when search current lastPrice' };

                }
            } else {
                currentPrice = data;

                // if (lastPrice < currentPrice) {
                //     return { valid: false, message: 'Controller: lastPrice must be valid and higher than the current lastPrice' };
                // }

            }
        })
    return { valid: true };
};

// function checkDuplicate(itemCode) {

//     Auction.findByItemCode(itemCode, (err, data) => {
//         if (err.kind === "Controller: Not Found.") {
//             return false; // code doesn't exist in db
//         } else {
//             res.status(409).send({
//                 message:
//                     err.message || 'Controller: duplicate itemCode'
//             });
//             return true;
//         }
//     });

// }

