export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}


export type NewUser = Omit<User, 'id'>;