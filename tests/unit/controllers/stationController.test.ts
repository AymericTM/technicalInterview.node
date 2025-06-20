import 'reflect-metadata'
import { describe, it, expect, vi } from 'vitest'
import { StationController } from '../../../src/controllers/stationController'
import { Request, Response } from 'express'
import { StationService } from '../../../src/services/stationService'

describe('StationController.getById', () => {
    it('return 400 for id not valid', async () => {
        const req = { params: { id: 'abc' } } as unknown as Request
        const json = vi.fn()
        const status = vi.fn(() => ({ json }))
        const res = { status } as unknown as Response

        await StationController.getById(req, res)

        expect(status).toHaveBeenCalledWith(400)
        expect(json).toHaveBeenCalledWith({ message: 'Invalid id' })
    })

    it('return 404 if not found station', async () => {
        const req = { params: { id: '1' } } as unknown as Request
        const json = vi.fn()
        const status = vi.fn(() => ({ json }))
        const res = { status } as unknown as Response

        vi.spyOn(StationService.prototype, 'getById').mockResolvedValueOnce(null)

        await StationController.getById(req, res)

        expect(status).toHaveBeenCalledWith(404)
        expect(json).toHaveBeenCalledWith({ message: 'Station not found' })
    })

    it('return the data if exist station', async () => {
        const req = { params: { id: '1' } } as unknown as Request
        const json = vi.fn()
        const res = { json } as unknown as Response
        const station = { id: 1, name: 'A', latitude: 0, longitude: 0 }

        vi.spyOn(StationService.prototype, 'getById').mockResolvedValueOnce(station)

        await StationController.getById(req, res)

        expect(json).toHaveBeenCalledWith(station)
    })
})
