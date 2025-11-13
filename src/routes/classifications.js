import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

router.get('/', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/classifications.json')
        const newClassification = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
        res.json(newClassification)
    } catch (error) {
        console.error('Error reading animal class data:', error)
        res.status(500).json({ message: 'Error retrieving animal class' })
    }
})

router.post('/', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/classifications.json')
        const classifications = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const newClassification = {
            id: classifications.length + 1,
            name: req.body.name,
        }

        newClassification.push(newClassification)
        fs.writeFileSync(dataPath, JSON.stringify(newClassification, null, 2))

        res.status(201).json({
            message: 'Animal classification added successfully',
            classification: newClassification,
        })
    } catch (error) {
        console.error('Error adding new animal classification:', error)
        res.status(500).json({ message: 'Error creating animal class' })
    }
})

// Link an animal to a classification (one to one relationship)
router.post('/link', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/classification-animal.json')
        const links = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const newLink = {
            animal_id: req.body.animal_id,
            classification_id: req.body.classification_id,
        }

        links.push(newLink)
        fs.writeFileSync(dataPath, JSON.stringify(links, null, 2))

        res.status(201).json({
            message: 'Animal successfully linked to classification',
            link: newLink,
        })
    } catch (error) {
        console.error('Error linking animal to  classification:', error)
        res.status(500).json({ message: 'Error linking animal and classification' })
    }
})

export default router
