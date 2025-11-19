import pool from '../db/connection.js'

export const getAllAnimals = async () => {
    const [rows] = await pool.query('SELECT * FROM animals')
    return rows
}

export const getAnimalById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM animals WHERE id = ?', [id])
    return rows[0]
}

export const getAnimalsByCollectionId = async (collection_id) => {
    const [rows] = await pool.query('SELECT * FROM animals WHERE collection_id = ?', [collection_id])
    return rows
}

export const createAnimal = async ({
    collection_id,
    name,
    description,
    classification,
    image_url,
}) => {
    const [result] = await pool.query(
        'INSERT INTO animals (collection_id, name, description, classification, image_url) VALUES (?, ?, ?, ?, ?)',
        [collection_id, name, description, classification, image_url]
    )
    return { id: result.insertId, collection_id, name, description, classification, image_url }
}
