import { PrismaClient } from '@prisma/client';
import { User } from 'models/User';
import { UserRepository } from 'repositories/UserRepository';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user_tb.findUnique({
      where: { email: email }
    });
    return user;
  }

  async createUser(user: Omit<User, 'user_id' | 'created_at'>): Promise<User> {
    const createdUser = await this.prisma.user_tb.create({ data: user });
    return createdUser;
  }
}
