import { AppDataSource } from "../../../../../utils/database/dataSource";
import { User as UserEntity} from "../../../../../utils/database/entity/User.entity";
import User from "../../domain/User";
import UserRepository from "../../domain/repository/UserRepository";



export default class FindUserAuraDBRepository implements UserRepository {
  async findByEmail(email: string, password: string): Promise<User> {

    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOneOrFail({
      where: {
        email
      }
    })

    return new User(user.id, user.name, user.email, user.password);
  }
}