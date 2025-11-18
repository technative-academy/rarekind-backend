import * as CollectionsModel from '../models/collectionModel.js'

export const getCollections = async (req, res) => {
    try {
        const collections = await CollectionsModel.getAllCollections()
        res.status(200).json(collections)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch collections' })
    }
}

export const addCollection = async (req, res) => {
    try {
        const { user_id, name } = req.body

        if (!user_id || !name) {
            return res.status(400).json({ error: 'user_id and name are required' })
        }

        const newCollection = await CollectionsModel.createCollection({ user_id, name })

        res.status(201).json(newCollection)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create collection' })
    }
}
