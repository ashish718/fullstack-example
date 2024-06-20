require('dotenv').config()
const path = require("path");
const express = require("express");
const cors = require("cors");
// const cron = require("node-cron");
const app = express();
let db = require("./config/db.js");

const port = process.env.PORT || 8000;

//Routes declared
const userRoute = require("./routes/userRoute.js")
const otpRoute = require("./routes/otpRoute.js")

// Replace this with your HTTPS address
// const trackRoute = require("./routes/trackRoute");

/* Hi this is test branch */
// middlewares
app.use(cors());
app.use(express.json({ limit: "100mb" }));

//app routes
app.use("/user", userRoute);
app.use("/otp", otpRoute)

app.get("/status", (req, res) => {
  res.send("Active");
});

process.on('uncaughtException', error => {
  console.log(`Uncaught Exception: ${error.message}`)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection at ', promise, `reason: ${reason}`)
  process.exit(1)
})


  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});