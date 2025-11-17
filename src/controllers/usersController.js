import * as UsersModel from '../models/userModel.js'

export const getUsers = async (req, res) => {
    try {
        const users = await UsersModel.getAllUsers()
        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await UsersModel.getUserById(req.params.id)
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.status(200).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch user' })
    }
}
