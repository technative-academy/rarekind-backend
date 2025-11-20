import pool from '../db/connection.js'

export const getAllCollections = async () => {
    const [rows] = await pool.query('SELECT * FROM collections')
    return rows
}

export const createCollection = async ({
    user_id,
    name,
    description,
    animals,
    classifications,
}) => {
    const [result] = await pool.query(
        `INSERT INTO collections
        (user_id, name, description, animals, classifications, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [
            user_id,
            name,
            description || null,
            JSON.stringify(animals) || null,
            JSON.stringify(classifications) || null,
        ]
    )

    return {
        id: result.insertId,
        user_id,
        name,
        description,
        animals,
        classifications,
    }
}

export const getAnimalsByCollectionId = async (collectionId) => {
    const [rows] = await pool.query('SELECT  a.id, a.collection_id, a.name, a.classification_id, c.name AS classification_name, a.description, a.image_url FROM animals AS a JOIN classifications AS c ON a.classification_id = c.id WHERE a.collection_id = ?', [
        collectionId,
    ])
    return rows
}

export const getCollectionsByUserId = async (user_id) => {
    const [rows] = await pool.query('SELECT * FROM collections WHERE user_id = ?', [user_id])
    return rows
}
