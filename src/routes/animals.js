import express from 'express'
import { getAnimals, getAnimal, addAnimal, updateAnimal, deleteAnimal } from '../controllers/animalController.js'

const router = express.Router()

router.get('/', getAnimals)
router.get('/:id', getAnimal)
router.post('/', addAnimal)
router.patch('/:id', updateAnimal)
router.delete('/:id', deleteAnimal)

export default router

