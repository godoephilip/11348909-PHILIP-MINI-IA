const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/emr', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Import routes
const patientRoutes = require('./routes/patients');
const encounterRoutes = require('./routes/encounters');

// Use routes
app.use('/patients', patientRoutes);
app.use('/encounters', encounterRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(Server running on port ${port});
});