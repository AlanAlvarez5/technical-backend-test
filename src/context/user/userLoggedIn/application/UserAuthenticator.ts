import User from "../domain/User";
import UserRepository from "../domain/repository/UserRepository";

export default class UserAuthenticator {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(port: { email: string, password: string }): Promise<User> {
    const user = await this.userRepository.findByEmail(port.email, port.password);
    await user.authenticate(port.password);
    return user;
  }
}