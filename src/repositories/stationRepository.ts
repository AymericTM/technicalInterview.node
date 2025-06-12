import { PrismaClient, ChargingStation } from '@prisma/client'
import { CreateStationValidation } from '../schemas/stationSchema'

export class StationRepository {
    private prisma = new PrismaClient()

    async create(data: CreateStationValidation) {
        return this.prisma.chargingStation.create({
            data,
        })
    }

    async findAll() {
        return this.prisma.chargingStation.findMany()
    }

    async findById(id: number) {
        return this.prisma.chargingStation.findUnique({ where: { id } })
    }

    async findNearby(lat: number, lng: number, radius: number) {
        const stations = await this.findAll()
        return stations.filter((s) => {
            const distance = this.getDistance(lat, lng, s.latitude, s.longitude)
            return distance <= radius
        })
    }

    private getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
        const R = 6371 // km
        const dLat = ((lat2 - lat1) * Math.PI) / 180
        const dLng = ((lng2 - lng1) * Math.PI) / 180
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) ** 2
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
    }
}
