import express from 'express'
import { getCollections, addCollection } from '../controllers/collectionController.js'

const router = express.Router()

router.get('/', getCollections)
router.post('/', addCollection)

export default router
