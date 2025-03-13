const express = require('express');
const Event = require('../models/eventModel');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: error.message });
    }
});

// Create an event
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            console.error("Invalid data received:", req.body);
            return res.status(400).json({ message: "Title and description are required" });
        }

        const event = new Event({ title, description });
        const newEvent = await event.save();
        console.log("Event added successfully:", newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
