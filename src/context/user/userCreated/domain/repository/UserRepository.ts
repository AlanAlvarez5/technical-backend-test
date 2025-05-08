import User, { NewUser } from "../dto/User";

export default interface UserRepository {
  create(user: NewUser): Promise<User>;
}