import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { UserUseCase } from 'services/UserService';
import { PrismaUserRepository } from 'repositories/PrismaUserRepository';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, name, passwd } = req.body;

    const userRepository = new PrismaUserRepository(prisma);
    const userService = new UserUseCase(userRepository);
    try {
      const isAvailableEmail = await !userService.checkEmail(email);
      if (isAvailableEmail) {
        const newUser = await userService.signup({ passwd, email, name });
        res.status(201).json({ user: newUser });
      } else {
        res.status(409).json({ error: 'User with this email already exists' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
