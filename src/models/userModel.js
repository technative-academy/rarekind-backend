import pool from '../db/connection.js'

export const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT id, name, email, bio FROM users')
    return rows
}

export const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT id, name, email, bio FROM users WHERE id = ?', [id])
    return rows[0]
}
