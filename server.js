import express from 'express'
import usersRoutes from './src/routes/users.js'
import animalsRoutes from './src/routes/animals.js'
import collectionsRoutes from './src/routes/collections.js'
import speciesRoutes from './src/routes/species.js'
import authRouter from './src/routes/auth.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/users', usersRoutes)
app.use('/animals', animalsRoutes)
app.use('/collections', collectionsRoutes)
app.use('/species', speciesRoutes)
app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
