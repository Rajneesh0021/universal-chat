const mongoose = require("mongoose");

const connection = mongoose
  .connect(`${process.env.MongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection established"))
  .catch((err) => console.log(err.message));

module.exports = { connection };
