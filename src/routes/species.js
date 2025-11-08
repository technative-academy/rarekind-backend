import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

router.get('/', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/species.json')
        const species = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
        res.json(species)
    } catch (error) {
        console.error('Error reading species data:', error)
        res.status(500).json({ message: 'Error retrieving species' })
    }
})

router.post('/', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/species.json')
        const species = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const newSpecies = {
            id: species.length + 1,
            name: req.body.name,
        }

        species.push(newSpecies)
        fs.writeFileSync(dataPath, JSON.stringify(species, null, 2))

        res.status(201).json({
            message: 'Species added successfully',
            species: newSpecies,
        })
    } catch (error) {
        console.error('Error adding new species:', error)
        res.status(500).json({ message: 'Error creating species' })
    }
})

// Link an animal to a species (many to many relationship)
router.post('/link', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/species-animal.json')
        const links = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const newLink = {
            animal_id: req.body.animal_id,
            species_id: req.body.species_id,
        }

        links.push(newLink)
        fs.writeFileSync(dataPath, JSON.stringify(links, null, 2))

        res.status(201).json({
            message: 'Animal successfully linked to species',
            link: newLink,
        })
    } catch (error) {
        console.error('Error linking animal to species:', error)
        res.status(500).json({ message: 'Error linking animal and species' })
    }
})

export default router
