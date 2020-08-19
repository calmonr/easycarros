import { Router } from 'express'
import { Container } from 'typedi'
import { verify } from 'argon2'

import { UserService } from '../modules/user/user.service'
import { UserCreateDTO } from '../modules/user/dtos/user-create.dto'
import { generateJWT } from '../utils/jwt'

const router = Router()

router.post('/register', async ({ body: { name, email, password } }, res) => {
  const userService = Container.get(UserService)

  const payload: UserCreateDTO = { name, email, password }

  await userService.create(payload)

  return res.json({ success: true })
})

router.post('/login', async ({ body: { email, password } }, res) => {
  const userService = Container.get(UserService)

  const error = 'These credentials do not match our records.'

  const user = await userService.findByEmail(email)

  if (!user) {
    return res.status(401).json({
      error
    })
  }

  const { id: userId, password: userPassword } = user

  const verified = await verify(userPassword, password)

  if (!verified) {
    return res.status(401).json({
      error
    })
  }

  const { expiresIn, token } = generateJWT(userId)

  return res.json({ expiresIn, token })
})

export default router
