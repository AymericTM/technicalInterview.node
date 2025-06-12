import { Request, Response, NextFunction, RequestHandler } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validate = (schema: AnyZodObject): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ errors: error.errors })
                return
            }
            res.status(500).json({ message: 'Validation failed' })
        }
    }
}
