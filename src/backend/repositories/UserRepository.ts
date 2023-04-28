import { User } from 'models/User';

export interface UserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: Omit<User, 'user_id' | 'created_at'>): Promise<User>;
}
