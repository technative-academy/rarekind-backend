import express from 'express'
import {
    getCollections,
    addCollection,
    getAnimalsInCollection,
    getCollectionById,
    updateCollection,
    deleteCollection,
} from '../controllers/collectionController.js'

const router = express.Router()

router.get('/', getCollections)
router.post('/', addCollection)
router.get('/:id/animals', getAnimalsInCollection)
router.get('/:id', getCollectionById)
router.patch('/:id', updateCollection)
router.delete('/:id', deleteCollection)

export default router
