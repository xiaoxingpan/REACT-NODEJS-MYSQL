const db = require("./db.js");

// constructor
const Auction = function (auction) {
    this.sellerEmail = Auction.sellerEmail;
    this.itemName = Auction.itemName;
    this.itemDescription = Auction.itemDescription;
    this.lastPrice = Auction.lastPrice;
    this.lastBidderEmail = Auction.lastBidderEmail || null;
};

//create a Auction
Auction.create = (newAuction, result) => {
    db.query("INSERT INTO auctions SET ?", newAuction, (err, res) => {
        if (err) {
            console.log("Error inserting into the database:", err);
            result(err, null);
            return;
        }
        console.log("A new auction is created: ", { id: res.insertId, ...newAuction });
        result(null, { id: res.insertId, ...newAuction });
    });
};

// return all auction
Auction.getAll = (sortOrder, result) => {

    var query = db.format("SELECT * FROM auctions ORDER BY ??", [sortOrder]); // ?? represent a name of a field, ? represent a value
    // console.log(query);
    console.log("orderBy: " + sortOrder);
    db.query(query, [], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Auctions: ", res);
        result(null, res);
    });
};

// return one auction by id
Auction.findById = (id, result) => {
    db.query(`SELECT * FROM auctions WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found auctions: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Auctions with the id
        result({ kind: "not_found" }, null);
    });
};

// update a auction
Auction.updateById = (id, auction, result) => {
    console.log("enter update");
    console.log(auction);
    db.query(
        "UPDATE auctions SET lastPrice = ?, lastBidderEmail = ? WHERE id = ?",
        [auction.lastPrice, auction.lastBidderEmail, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Auctions with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Auctions: ", { id: id, ...auction });
            result(null, { id: id, ...auction });
        }
    );
};

// return lastPrice auction by id
Auction.findLastBidById = (id, result) => {
    db.query(`SELECT lastPrice FROM auctions WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found current lastPrice for auction ${id}: ${res[0].lastPrice}`);
            result(null, res[0].lastPrice);
            return;
        }

        // not found Auctions with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Auction;