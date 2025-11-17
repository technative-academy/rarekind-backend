import jwt from 'jsonwebtoken'
import * as AuthModel from '../models/authModel.js'

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    })
}

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_SECRET, {
        expiresIn: '7d',
    })
}

export const register = async (req, res) => {
    try {
        const { name, email, password, bio } = req.body

        const existingUser = await AuthModel.findUserByEmail(email)
        if (existingUser) return res.status(400).json({ error: 'Email already exists' })

        const newUser = await AuthModel.createUser({ name, email, password, bio })

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        })
    } catch (err) {
        console.error('Error registering user:', err)
        res.status(500).json({ error: 'Error registering user' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await AuthModel.findUserByEmail(email)

        if (!user) return res.status(400).json({ error: 'Invalid email or password' })

        const validPassword = await AuthModel.checkPassword(password, user.password)
        if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            accessToken,
        })
    } catch (err) {
        console.error('Error logging in:', err)
        res.status(500).json({ error: 'Error logging in' })
    }
}

export const refreshToken = (req, res) => {
    try {
        const token = req.cookies?.refreshToken
        if (!token) return res.status(401).json({ error: 'Missing refresh token' })

        const user = jwt.verify(token, process.env.REFRESH_SECRET)
        const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        })

        res.status(200).json({ accessToken })
    } catch (err) {
        console.error('Error refreshing token:', err)
        res.status(403).json({ error: 'Invalid refresh token' })
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken', { path: '/' })
    res.status(200).json({ message: 'Logged out' })
}
