import { Router } from 'express'

import { checkpoint } from '../middlewares/jwt.middleware'
import auth from './auth'
import partner from './partner'

const router = Router()

router.use('/auth', auth)
router.use('/partner', checkpoint(), partner)

export default router
