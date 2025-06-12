import express, { RequestHandler } from 'express'

import { StationController } from '../controllers/stationController'
import { validate } from '../middleware/validate'
import { CreateStationRequestSchema, GetByIdRequestSchema, GetNearbyRequestSchema } from '../schemas/stationSchema'

const router = express.Router()

router.post('/', validate(CreateStationRequestSchema), StationController.create)
router.get('/', StationController.getAll)
router.get('/nearby', validate(GetNearbyRequestSchema), StationController.getNearby)
router.get('/:id', validate(GetByIdRequestSchema), StationController.getById as RequestHandler)

export default router
