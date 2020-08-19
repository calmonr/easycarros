import { Router } from 'express'
import { Container } from 'typedi'

import { UserService } from '../modules/user/user.service'
import { UserCreateDTO } from '../modules/user/dtos/user-create.dto'

const router = Router()

router.post('/register', async ({ body: { name, email, password } }, res) => {
  const userService = Container.get(UserService)
  const payload: UserCreateDTO = { name, email, password }

  await userService.create(payload)

  res.json({ success: true })
})

export default router
