import pool from '../db/connection.js'
import bcrypt from 'bcryptjs'

export const findUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    return rows[0]
}

export const createUser = async ({ name, email, password, bio = '' }) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const [result] = await pool.query(
        'INSERT INTO users (name, email, password, bio) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, bio]
    )

    return {
        id: result.insertId,
        name,
        email,
        bio,
    }
}

export const checkPassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword)
}
