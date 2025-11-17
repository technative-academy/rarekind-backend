import pool from '../db/connection.js'

export const getAllCollections = async () => {
    const [rows] = await pool.query('SELECT * FROM collections')
    return rows
}

export const createCollection = async ({ user_id, name }) => {
    const [result] = await pool.query('INSERT INTO collections (user_id, name) VALUES (?, ?)', [
        user_id,
        name,
    ])

    return {
        id: result.insertId,
        user_id,
        name,
    }
}
