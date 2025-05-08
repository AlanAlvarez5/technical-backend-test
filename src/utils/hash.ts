import { hash } from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
}

export {
  hashPassword
}