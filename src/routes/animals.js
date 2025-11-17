import express from 'express'
import { getAnimals, getAnimal, addAnimal } from '../controllers/animalController.js'

const router = express.Router()

router.get('/', getAnimals)
router.get('/:id', getAnimal)
router.post('/', addAnimal)

export default router
