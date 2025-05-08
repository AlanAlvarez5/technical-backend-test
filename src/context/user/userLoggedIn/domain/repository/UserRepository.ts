import User from "../User";

export default interface UserRepository {
  findByEmail(email: string, password: string): Promise<User>;
}