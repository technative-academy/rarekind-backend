import express from 'express'
import { getUsers, getUser } from '../controllers/usersController.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)

export default router
