import { User, SignInRequest, SignUpRequest } from 'models/User';
import { UserRepository } from 'repositories/UserRepository';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async signup(user: SignUpRequest): Promise<User> {
    const existingUser = await this.userRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }

  async signin(user: SignInRequest): Promise<User | null> {
    const searchUser = await this.userRepository.getUserByEmail(user.email);
    if (!searchUser) {
      return null;
    }

    const isMatchPassword = await this.comparePassword(
      user.passwd,
      searchUser.passwd
    );
    if (!isMatchPassword) {
      return null;
    }

    return searchUser;
  }

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bycrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isPasswordMatch = await bycrypt.compare(
      plainTextPassword,
      hashedPassword
    );

    return isPasswordMatch;
  }

  generateToken(user: User): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set in environment variables');
    }

    return jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.getUserByEmail(email);
    return user ? true : false;
  }
}
