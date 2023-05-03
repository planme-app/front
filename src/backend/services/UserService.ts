import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class SignupUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: Omit<User, 'user_id' | 'created_at'>): Promise<User> {
    const existingUser = await this.userRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }
}
