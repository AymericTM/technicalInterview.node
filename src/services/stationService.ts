import { inject, injectable } from 'tsyringe'
import { StationRepository } from '../repositories/stationRepository'
import { CreateStationValidation } from '../schemas/stationSchema'
import redisClient from '../redisClient'

@injectable()
export class StationService {
    constructor(@inject('StationRepository') private repo: StationRepository) {}

    createStation(data: CreateStationValidation) {
        return this.repo.create(data)
    }

    getAll() {
        return this.repo.findAll()
    }

    async getById(id: number) {
        const cacheKey = `station:${id}`

        const cached = await redisClient.get(cacheKey)
        if (cached) {
            return JSON.parse(cached)
        }

        const station = await this.repo.findById(id)

        if (station) {
            await redisClient.set(cacheKey, JSON.stringify(station), {
                EX: 3600,
            })
        }

        return station
    }

    async getNearby(lat: number, lng: number, radius: number) {
        const cacheKey = `nearby:${lat}:${lng}:${radius}`

        const cached = await redisClient.get(cacheKey)
        if (cached) {
            return JSON.parse(cached)
        }

        const nearbyStations = await this.repo.findNearby(lat, lng, radius)

        await redisClient.set(cacheKey, JSON.stringify(nearbyStations), {
            EX: 3600,
        })

        return nearbyStations
    }
}
