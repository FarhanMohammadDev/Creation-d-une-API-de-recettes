// npm init -y  &&  npm i express && npm i nodemon -D
// npx nodemon index    --->  npm start
const express = require("express");
const recipesPath = require("./routes/recipes");
const logger = require("./middlewares/logger")
const {notFound,errorHandler} = require("./middlewares/errors")
// npm i dotenv
const dotenv = require("dotenv");
const  Database  = require("./configs/db");
dotenv.config();

// initialisation App
const app = express();

// apply Middlewares
app.use(express.json());  //convert json to javascript
app.use(logger)

//Routes
app.use("/api/recipes",recipesPath);

// Error Handler Middleware 
app.use(notFound)
app.use(errorHandler)


// Connection To Database 
const db = new Database(process.env.MONGO_URL);
db.connect();

// Running The Server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));
