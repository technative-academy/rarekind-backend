import express from 'express'
import {
    getCollections,
    addCollection,
    getAnimalsInCollection,
    updateCollection,
} from '../controllers/collectionController.js'

const router = express.Router()

router.get('/', getCollections)
router.post('/', addCollection)
router.get('/:id/animals', getAnimalsInCollection)
router.patch('/:id', updateCollection)

export default router
