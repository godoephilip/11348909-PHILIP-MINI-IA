const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Register a new patient
router.post('/', async (req, res) => {
    try {
        const existingPatient = await Patient.findOne({ patientId: req.body.patientId });
        if (existingPatient) {
            return res.status(400).send('Patient already exists');
        }

        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).send(patient);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.send(patients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a specific patient
router.get('/:patientId', async (req, res) => {
    try {
        const patient = await Patient.findOne({ patientId: req.params.patientId });
        if (!patient) {
            return res.status(404).send('Patient not found');
        }
        res.send(patient);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;