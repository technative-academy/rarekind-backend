import express from 'express'
import { getUsers, getUser } from '../controllers/usersController.js'
import { getUserCollections } from '../controllers/collectionController.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/collections', getUserCollections)

export default router
