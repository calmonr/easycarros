import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { hash } from 'argon2'

import { User } from './user.entity'
import { UserCreateDTO } from './dtos/user-create.dto'

@Service()
export class UserService {
  @InjectRepository(User)
  private repository!: Repository<User>

  async create({ name, email, password }: UserCreateDTO): Promise<User> {
    const hashedPassword = await hash(password)

    const entity = this.repository.create({
      name,
      email,
      password: hashedPassword
    })

    const user = await entity.save()

    return user
  }
}
