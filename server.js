import express from 'express'
import usersRoutes from './src/routes/users.js'
import animalsRoutes from './src/routes/animals.js'
import collectionsRoutes from './src/routes/collections.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/users', usersRoutes)
app.use('/animals', animalsRoutes)
app.use('/collections', collectionsRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
