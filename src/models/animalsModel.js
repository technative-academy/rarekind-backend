import pool from '../db/connection.js'

export const getClassificationNameById = async (id) => {
    const [rows] = await pool.query('SELECT name FROM classifications WHERE id = ?', [id])

    return rows[0] ? rows[0].name : null
}

export const getAllAnimals = async () => {
    const [rows] = await pool.query(
        'SELECT  a.id, a.collection_id, a.name, a.classification_id, c.name AS classification_name, a.description, a.image_url FROM animals AS a JOIN classifications AS c ON a.classification_id = c.id'
    )

    return rows
}

export const getAnimalById = async (id) => {
    const [rows] = await pool.query('SELECT  a.id, a.collection_id, a.name, a.classification_id, c.name AS classification_name, a.description, a.image_url FROM animals AS a JOIN classifications AS c ON a.classification_id = c.id WHERE a.id = ?', [id]

    )
    return rows[0]
}

export const getAnimalsByCollectionId = async (collection_id) => {
    const [rows] = await pool.query('SELECT  a.id, a.collection_id, a.name, a.classification_id, c.name AS classification_name, a.description, a.image_url FROM animals AS a JOIN classifications AS c ON a.classification_id = c.id WHERE a.collection_id = ?', [
        collection_id,
    ])
    return rows
}

export const createAnimal = async ({
    collection_id,
    name,
    description,
    classification_id,
    image_url,
}) => {
    const [result] = await pool.query(
        'INSERT INTO animals (collection_id, name, description, classification_id, image_url) VALUES (?, ?, ?, ?, ?)',
        [collection_id, name, description, classification_id, image_url]
    )

    return {
        id: result.insertId,
        collection_id,
        name, description, classification_id, image_url
    }
}


export const updateAnimal = async ({
    id,
    collection_id,
    name,
    description,
    classification_id,
    image_url,
}) => {
    const [result] = await pool.query(
        'UPDATE animals SET collection_id = ?, name = ?, description = ?, classification_id = ?, image_url = ? WHERE id = ?',
        [collection_id, name, description, classification_id, image_url, id]
    )
    return { id, collection_id, name, description, classification_id, image_url }
}

export const deleteAnimal = async ({
    id,
}) => {
    const [result] = await pool.query(
        'DELETE FROM animals WHERE id = ?',
        [id]
    )
    return { id }
}
