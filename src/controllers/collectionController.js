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
        const { user_id, name, description, animals, classifications } = req.body

        if (!user_id || !name) {
            return res.status(400).json({ error: 'user_id and name are required' })
        }

        const newCollection = await CollectionsModel.createCollection({
            user_id,
            name,
            description,
            animals,
            classifications,
        })

        res.status(201).json(newCollection)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create collection' })
    }
}

export const getAnimalsInCollection = async (req, res) => {
    try {
        const { id } = req.params

        const animals = await CollectionsModel.getAnimalsByCollectionId(id)

        res.status(200).json({
            collection_id: id,
            animal_count: animals.length,
            animals,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch animals for this collection' })
    }
}
