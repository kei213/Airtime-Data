const express = require('express')
const admin = require("firebase-admin")
const router = express.Router()
const { initFirebase } = require('../initFirebase')

//init firebase
initFirebase()

//firestore database
const db = admin.firestore();

// get all airtime documents
router.get('/', async(req, res) => {
	// get doc from db
    try {
	    const response = await db.collection("Airtime Center").get()
	    res.status(200).json(response)
	} catch (error) {
	    res.status(400).json({error: error.message})
    }
})

// get a single airtime record
router.get('/:id', (req, res) => {
    res.json({mssg: `Get a single record: ${req.id}`})
})

//Post a new airtime record
// router.post('/', createWorkout)

//Delete an airtime record
router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete a workout'})
})

//Update an airtime record
router.patch('/:id', (req, res) => {
    res.json({mssg: 'Update a workout'})
})

module.exports = router