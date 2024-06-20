const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoConnected");
  } catch (error) {
    console.error(error);
  }
};

let db = connectDB();

module.exports = db;