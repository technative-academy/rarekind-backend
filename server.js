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
import rateLimit from 'express-rate-limit'

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

app.set('trust proxy', 1)

app.use(cors(corsOptions))
app.use(express.json())

app.use(cookieParser())

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000,
    limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(limiter)

app.use('/users', usersRoutes)
app.use('/animals', animalsRoutes)
app.use('/collections', collectionsRoutes)
app.use('/classifications', classificationRoutes)
app.use('/auth', authRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
