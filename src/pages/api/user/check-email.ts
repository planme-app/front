import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { UserUseCase } from 'services/UserService';
import { PrismaUserRepository } from 'repositories/PrismaUserRepository';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { email } = req.query;

    const userRepository = new PrismaUserRepository(prisma);
    const userService = new UserUseCase(userRepository);
    try {
      if (email && typeof email === 'string') {
        const isAvailable = await userService.checkEmail(email);
        res.status(200).json({ isAvailable });
      } else {
        res.status(400).json({ error: 'Email is required' });
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
