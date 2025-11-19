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

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const file = fs.readFileSync('src/docs/RareFind.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(express.json())
app.use('/users', usersRoutes)
app.use('/animals', animalsRoutes)
app.use('/collections', collectionsRoutes)
app.use('/classifications', classificationRoutes)
app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
