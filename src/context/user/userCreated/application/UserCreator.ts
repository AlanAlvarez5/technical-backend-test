import User, { NewUser } from "../domain/dto/User";
import UserRepository from "../domain/repository/UserRepository";

export default class UserCreator {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: NewUser): Promise<User> {
    return await this.userRepository.create(user);
  }
}