import express from 'express'
import usersRoutes from './src/routes/users.js'
import collectionsRoutes from './src/routes/collections.js'
import speciesRoutes from './src/routes/species.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/users', usersRoutes)
app.use('/collections', collectionsRoutes)
app.use('/species', speciesRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
