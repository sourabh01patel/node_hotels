const express = require('express');
const router = express.Router();
const menuItem = require('../Models/MenuItem');

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newMenuItem = new menuItem(data);

        const savedMenuItem = await newMenuItem.save();

        console.log("Data saved successfully");

        res.status(201).json(savedMenuItem);

    } catch (error) {
        console.error("Actual Error:", error);

        res.status(500).json({
            error: error.message
        });
    }
});
router.get('/', async (req, res) => {
    try {
        const data = await menuItem.find();

        res.status(200).json(data);

    } catch (error) {
        console.error("Actual Error:", error);

        res.status(500).json({
            error: error.message
        });
    }
});
// NEW API 1 - Get Items By Taste
router.get('/taste/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;

        const data = await menuItem.find({
            taste: {
                $regex: `^${taste}$`,
                $options: 'i'
            }
        });

        res.status(200).json({
            taste: taste,
            totalItems: data.length,
            items: data
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// NEW API 2 - Count Items By Taste
router.get('/count/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;

        const count = await menuItem.countDocuments({
            taste: {
                $regex: `^${taste}$`,
                $options: 'i'
            }
        });

        res.status(200).json({
            taste: taste,
            totalItems: count
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// NEW API 3 - Count All Menu Items
router.get('/count', async (req, res) => {
    try {
        const count = await menuItem.countDocuments();

        res.status(200).json({
            totalMenuItems: count
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;