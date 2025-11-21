import express from 'express'
import {
    getCollections,
    addCollection,
    getAnimalsInCollection,
    getCollectionById,
    updateCollection,
} from '../controllers/collectionController.js'

const router = express.Router()

router.get('/', getCollections)
router.post('/', addCollection)
router.get('/:id/animals', getAnimalsInCollection)
router.get('/:id', getCollectionById)
router.patch('/:id', updateCollection)

export default router
