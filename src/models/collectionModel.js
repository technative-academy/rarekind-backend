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
    const [rows] = await pool.query('SELECT * FROM animals WHERE collection_id = ?', [
        collectionId,
    ])
    return rows
}
