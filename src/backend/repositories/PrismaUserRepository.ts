import { PrismaClient } from '@prisma/client';
import { User, SignUpRequest } from 'models/User';
import { UserRepository } from 'repositories/UserRepository';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    return user;
  }

  async createUser(user: SignUpRequest): Promise<User> {
    const createdUser = await this.prisma.user.create({ data: user });
    return createdUser;
  }
}
