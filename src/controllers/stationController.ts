import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StationService } from '../services/stationService'

export class StationController {
    static async create(req: Request, res: Response) {
        try {
            const service = container.resolve(StationService)

            const newStation = await service.createStation(req.body)

            res.status(201).json(newStation)
        } catch (error) {
            console.error('Error in create:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getAll(req: Request, res: Response) {
        const service = container.resolve(StationService)
        const data = await service.getAll()
        res.json(data)
    }

    static async getById(req: Request, res: Response) {
        try {
            const service = container.resolve(StationService)
            const id = Number(req.params.id)

            const station = await service.getById(id)
            if (!station) return res.status(404).json({ message: 'Station not found' })

            res.json(station)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getNearby(req: Request, res: Response) {
        try {
            const service = container.resolve(StationService)

            const lat = Number(req.query.lat)
            const lng = Number(req.query.lng)
            const radius = Number(req.query.radius)

            const nearbyStations = await service.getNearby(lat, lng, radius)
            res.json(nearbyStations)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}
