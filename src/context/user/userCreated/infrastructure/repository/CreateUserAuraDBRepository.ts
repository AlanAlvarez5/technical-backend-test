import { AppDataSource } from "../../../../../utils/database/dataSource";
import User, { NewUser } from "../../domain/dto/User";
import UserRepository from "../../domain/repository/UserRepository";
import { hashPassword } from "../../../../../utils/hash";
import { User as UserEntity } from "../../../../../utils/database/entity/User.entity";

export default class CreateUserAuraDBRepository implements UserRepository {
  async create(user: NewUser): Promise<User> {

    const hashedPassword = await hashPassword(user.password);

    const userRepository = AppDataSource.getRepository(UserEntity);
    const createdUser = await userRepository.save({
      ...user,
      password: hashedPassword
    } )

    return createdUser;
  }
}