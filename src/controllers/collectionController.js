import * as CollectionsModel from '../models/collectionModel.js'

export const getCollections = async (req, res) => {
    try {
        const collections = await CollectionsModel.getAllCollections()
        const collectionsOfAnimals = await Promise.all(
            collections.map(async (collection) => {
                const animals = await CollectionsModel.getAnimalsByCollectionId(collection.id)
                return {
                    ...collection,
                    animals,
                }
            })
        )
        res.status(200).json(collectionsOfAnimals)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch collections' })
    }
}

export const getCollectionById = async (req, res) => {
    try {
        const { id } = req.params

        const collection = await CollectionsModel.getCollectionById(id)
        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' })
        }

        const animals = await CollectionsModel.getAnimalsByCollectionId(id)

        res.status(200).json({
            ...collection,
            animals,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch collection' })
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

export const getUserCollections = async (req, res) => {
    const user_id = req.params.id
    const collections = await CollectionsModel.getCollectionsByUserId(user_id)
    res.status(200).json(collections)
}

export const updateCollection = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        if (!name && !description) {
            return res.status(400).json({ error: 'Nothing to update' })
        }

        const result = await CollectionsModel.updateCollectionById(id, {
            name,
            description,
        })

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Collection not found' })
        }

        res.status(200).json({
            id,
            name,
            description,
            updated_at: new Date(),
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to update collection' })
    }
}

export const deleteCollection = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await CollectionsModel.deleteCollection(id)

        if (!deleted) {
            return res.status(404).json({ error: 'Collection not found' })
        }

        res.status(200).json({ message: 'Collection deleted successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to delete collection' })
    }
}
