import express from 'express'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'
import usersRoutes from './src/routes/users.js'
import animalsRoutes from './src/routes/animals.js'
import collectionsRoutes from './src/routes/collections.js'
import classificationRoutes from './src/routes/classifications.js'
import authRouter from './src/routes/auth.js'
import dotenv from 'dotenv'
import cors from 'cors'
import './src/db/connection.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const file = fs.readFileSync('src/docs/RareFind.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

// Define CORS options to allow requests from the specified origin and include credentials
// This is crucial when using HTTP cookies for authentication, as cookies are not shared across domains by default
// Includes credentials (such as cookies) in requests and responses.
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(cookieParser())

app.use('/users', usersRoutes)
app.use('/animals', animalsRoutes)
app.use('/collections', collectionsRoutes)
app.use('/classifications', classificationRoutes)
app.use('/auth', authRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
