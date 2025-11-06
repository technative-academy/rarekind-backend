import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

router.get('/', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/collections.json')
        const collections = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
        res.json(collections)
    } catch (error) {
        console.error('Error reading collections.json:', error)
        res.status(500).json({ message: 'Error loading collections data' })
    }
})

router.post('/', (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/collections.json')
        const collections = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const newCollection = {
            id: collections.length + 1,
            user_id: req.body.user_id,
            name: req.body.name,
        }

        collections.push(newCollection)
        fs.writeFileSync(dataPath, JSON.stringify(collections, null, 2))

        res.status(201).json({
            message: 'Collection created successfully',
            collection: newCollection,
        })
    } catch (error) {
        console.error('Error writing to collections.json:', error)
        res.status(500).json({ message: 'Error creating collection' })
    }
})

export default router
