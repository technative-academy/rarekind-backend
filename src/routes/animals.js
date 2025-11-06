import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

router.get('/', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/animals.json')
        const animals = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
        res.json(animals)
    } catch (error) {
        console.error('Error reading animals.json:', error)
        res.status(500).json({ message: 'Error loading animals data' })
    }
})

router.get('/:id', (req, res) => {
    try {
        const animalId = parseInt(req.params.id)
        const dataPath = path.resolve('mock-data/animals.json')
        const animals = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const animal = animals.find((a) => a.id === animalId)

        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' })
        }

        res.json(animal)
    } catch (error) {
        console.error('Error fetching animal:', error)
        res.status(500).json({ message: 'Error loading animal data' })
    }
})

router.post('/', (req, res) => {
	try {
		const dataPath = path.resolve('mock-data/animals.json')
		const animals = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

		const newAnimal = {
			id: animals.length + 1,
			collection_id: req.body.collection_id,
			name: req.body.name,
			description: req.body.description,
			species: req.body.species,
			image_url: req.body.image_url,
		}

		animals.push(newAnimal)
		fs.writeFileSync(dataPath, JSON.stringify(animals, null, 2))

		res.status(201).json({
			message: 'Animal created successfully',
			animal: newAnimal,
		})
	} catch (error) {
		console.error('Error writing to animals.json:', error)
		res.status(500).json({ message: 'Error creating animal' })
	}
})

export default router
