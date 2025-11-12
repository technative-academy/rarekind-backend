import express from 'express'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

const dataPath = path.resolve('mock-data/users.json')

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

router.post('/register', async (req, res) => {
    try {
        const dataPath = path.resolve('mock-data/users.json')
        const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const { name, email, password } = req.body

        if (users.find((u) => u.email === email)) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
        }

        users.push(newUser)
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        })
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ error: 'Error registering user' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

        const user = users.find((u) => u.email === email)
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' })
        }

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
            accessToken,
        })
    } catch (error) {
        console.error('Error logging in:', error)
        res.status(500).json({ error: 'Error logging in' })
    }
})

router.post('/refresh-token', (req, res) => {
    const token = req.cookies?.refreshToken
    if (!token) return res.status(401).json({ error: 'Missing refresh token' })

    try {
        const user = jwt.verify(token, process.env.REFRESH_SECRET)
        const accessToken = generateAccessToken(user)
        res.status(200).json({ accessToken })
    } catch (err) {
        res.status(403).json({ error: 'Invalid refresh token' })
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'Logged out' })
})

export default router
