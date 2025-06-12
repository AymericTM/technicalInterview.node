import 'reflect-metadata'
import './di/container'

import express from 'express'
import cors from 'cors'
import stationRoutes from './routes/stationRoutes'

const app = express()

app.use(express.json())

app.use(cors())
app.use('/station', stationRoutes)

export default app
