import * as AnimalsModel from '../models/animalsModel.js'

export const getAnimals = async (req, res) => {
    try {
        const animals = await AnimalsModel.getAllAnimals()
        res.status(200).json(animals)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch animals' })
    }
}

export const getAnimal = async (req, res) => {
    try {
        const animal = await AnimalsModel.getAnimalById(req.params.id)
        if (!animal) return res.status(404).json({ error: 'Animal not found' })
        res.status(200).json(animal)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch animal' })
    }
}

export const addAnimal = async (req, res) => {
    try {
        const animals = Array.isArray(req.body) ? req.body : [req.body]
        const results = []

        for (const animal of animals) {
            if (!animal.collection_id || !animal.name) {
                return res.status(400).json({ error: 'collection_id and name are required' })
            }
            const newAnimal = await AnimalsModel.createAnimal(animal)
            results.push(newAnimal)
        }

        res.status(201).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create animals' })
    }
}

export const updateAnimal = async (req, res) => {
    try {
        const animals = Array.isArray(req.body) ? req.body : [req.body]
        const results = []

        for (const animal of animals) {
            if (!animal.id) {
                return res.status(400).json({ error: 'id is required' })
            }
            const updatedAnimal = await AnimalsModel.updateAnimal(animal)
            results.push(updatedAnimal)
        }

        res.status(201).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to update animal' })
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params

        // Validate ID exists
        if (!id) {
            return res.status(400).json({ error: 'Animal ID is required' })
        }
        // Check if animal exists first
        const animal = await AnimalsModel.getAnimalById(id)
        if (!animal) {
            return res.status(404).json({ error: 'Animal not found' })
        }
        // Delete the animal
        await AnimalsModel.deleteAnimal({id})

        res.status(200).json({
            message: 'Animal deleted successfully',
            deleted_id: id
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to delete animal' })
    }
}
