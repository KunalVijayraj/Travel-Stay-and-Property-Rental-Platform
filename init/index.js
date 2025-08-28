const mongoose = require("mongoose");
const initData = require("./data.js");
const Listings = require("../Models/listing.js");

main().then(() => {console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

const initDB = async() => {
    await Listings.deleteMany({});
    initData.data = initData.data.map( (obj) => ( {...obj, owner: "67dc59461cce85d46dd881ac"} ));
    await Listings.insertMany(initData.data);
    console.log("DB is initialized");
};

initDB();