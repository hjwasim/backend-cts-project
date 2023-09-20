const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();

//Import routes
const authRoute = require('./routes/authRoute');
const searchCaregiverRoute = require('./routes/searchCaregiverRoute')
const assignCaregiverRoute = require('./routes/assignCaregiverRoute')

const port = process.env.APP_PORT || 3200;

const cors_options = {
    origin: 'http://localhost:3000'
}

//Middlewares
app.use(cors(cors_options));
app.use(express.json())

//Routes
app.use('/auth', authRoute)
app.use('/caregiver/search', searchCaregiverRoute);
app.use('/caregiver/assign', assignCaregiverRoute);


app.listen(port, () => console.log(`Server Started on port ${port}...`));
