import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

router.get('/', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/users.json')
        const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
        res.json(users)
    } catch (error) {
        console.error('Error reading users.json:', error)
        res.status(500).json({ message: 'Error loading users data' })
    }
})

router.get('/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const dataPath = path.resolve('mock-data/users.json')
        const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const user = users.find((u) => u.id === userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        res.status(500).json({ message: 'Error loading user data' })
    }
})

export default router
