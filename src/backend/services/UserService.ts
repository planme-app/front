import { User } from 'models/User';
import { UserRepository } from 'repositories/UserRepository';

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async signup(user: Omit<User, 'user_id' | 'created_at'>): Promise<User> {
    const existingUser = await this.userRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.getUserByEmail(email);
    return user ? true : false;
  }
}
