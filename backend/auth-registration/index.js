const express = require("express");
const app = express();
require("dotenv").config();

//Import routes
const authRoute = require('./routes/authRoute');
const searchCaregiverRoute = require('./routes/searchCaregiverRoute')
const assignCaregiverRoute = require('./routes/assignCaregiverRoute')

const port = process.env.APP_PORT || 3000;

//Middlewares
app.use(express.json())

//Routes
app.use('/auth', authRoute)
app.use('/caregiver', searchCaregiverRoute);
app.use('/caregiver/assign', assignCaregiverRoute);


app.listen(port, () => console.log(`Server Started on port ${port}...`));
