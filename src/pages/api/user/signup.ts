import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { SignupUseCase } from 'services/UserService';
import { PrismaUserRepository } from 'repositories/PrismaUserRepository';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, name, passwd } = req.body;

    const userRepository = new PrismaUserRepository(prisma);
    const signupUseCase = new SignupUseCase(userRepository);
    try {
      const newUser = await signupUseCase.execute({ passwd, email, name });
      res.status(201).json({ user: newUser });
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
