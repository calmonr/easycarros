import { Router } from 'express'

import { checkpoint } from '../middlewares/jwt.middleware'
import auth from './auth'

const router = Router()

router.use('/auth', auth)

router.get('/protected', checkpoint(), (_req, res) =>
  res.json({
    working: true
  })
)

export default router
