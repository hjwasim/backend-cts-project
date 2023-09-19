const express = require("express");
const app = express();
require("dotenv").config()

const port = process.env.APP_PORT || 3000;

//Middlewares
app.use(express.json())

//Routes
// app.use('/auth', authRoute)
// app.use('/books', booksRoute);

app.listen(port, () => console.log(`Server Started on port ${port}...`));
