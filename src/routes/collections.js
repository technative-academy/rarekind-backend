import express from 'express'
import {
    getCollections,
    addCollection,
    getAnimalsInCollection,
} from '../controllers/collectionController.js'

const router = express.Router()

router.get('/', getCollections)
router.post('/', addCollection)
router.get('/:id/animals', getAnimalsInCollection)

export default router
