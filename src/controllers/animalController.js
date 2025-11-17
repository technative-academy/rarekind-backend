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
        const newAnimal = await AnimalsModel.createAnimal(req.body)
        res.status(201).json(newAnimal)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create animal' })
    }
}
