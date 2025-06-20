import request from 'supertest'
import app from '../../src/server'
import { afterAll, describe, it, expect, beforeAll } from 'vitest'

describe('GET /station/:id - integration', () => {
    let server: any

    beforeAll(() => {
        server = app.listen() // avvia server in test
    })
    afterAll(() => {
        server.close()
    })

    it('400 id invalid', async () => {
        const res = await request(app).get('/station/abc')
        expect(res.status).toBe(400)
        expect(res.body).toEqual({ message: 'Invalid id' })
    })

    it('404 id not exist', async () => {
        const res = await request(app).get('/station/999999')
        expect(res.status).toBe(404)
        expect(res.body).toEqual({ message: 'Station not found' })
    })

    it('200 and data exist', async () => {
        // Assicurati che la station con id=1 esista in DB o mocka il repo
        const res = await request(app).get('/station/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id', 1)
        expect(res.body).toHaveProperty('name')
    })
})
