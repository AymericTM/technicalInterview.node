import { z } from 'zod'

export const CreateStationSchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    latitude: z.number(),
    longitude: z.number(),
    power: z.number().int().positive(),
    isAvailable: z.boolean(),
})

export const CreateStationRequestSchema = z.object({
    body: CreateStationSchema,
    query: z.object({}).optional(),
    params: z.object({}).optional(),
})

export const GetNearbyRequestSchema = z.object({
    query: z.object({
        lat: z.preprocess((val) => Number(val), z.number()),
        lng: z.preprocess((val) => Number(val), z.number()),
        radius: z.preprocess((val) => Number(val), z.number().positive()),
    }),
    params: z.object({}).optional(),
    body: z.object({}).optional(),
})

export const GetByIdRequestSchema = z.object({
    params: z.object({
        id: z.preprocess((val) => Number(val), z.number().int().positive()),
    }),
    query: z.object({}).optional(),
    body: z.object({}).optional(),
})

export type CreateStationValidation = z.infer<typeof CreateStationSchema>
export type CreateStationRequestValidation = z.infer<typeof CreateStationRequestSchema>
export type GetNearbyRequestValidation = z.infer<typeof GetNearbyRequestSchema>
export type GetByIdRequestValidation = z.infer<typeof GetByIdRequestSchema>
