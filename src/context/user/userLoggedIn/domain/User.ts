import { compare } from "bcrypt";

export default class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async authenticate(password: string): Promise<void> {
    const isValid = await compare(password, this.password);
    if ( !isValid ) {
      throw new Error("Invalid password");
    }
  }
}