import { Role } from './roles.model';

export interface User {
  _id?: string;
  role: Role;
  name: string;
  email: string;
  token?: string;
  password?: string;
  store?: string;
}

export interface Login {
  email: string;
  password: string;
}
