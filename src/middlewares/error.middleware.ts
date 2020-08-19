import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from 'express-jwt'

export default () => (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (res.headersSent) {
    return next(error)
  }

  if (error instanceof UnauthorizedError) {
    return res.status(401).json({
      message: 'No authentication token was found or is invalid.'
    })
  }

  return res.status(500).json({ message: 'Something went wrong.' })
}
