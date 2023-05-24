import { User, SignUpRequest } from 'models/User';

export interface UserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(user_id: string): Promise<User | null>;
  createUser(user: SignUpRequest): Promise<User>;
}
