import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { UserUseCase } from 'services/UserService';
import { PrismaUserRepository } from 'repositories/PrismaUserRepository';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, passwd } = req.body;

    if (email === '') {
      res.status(400).json({ error: 'Email is required' });
      return;
    } else if (passwd === '') {
      res.status(400).json({ error: 'Password is required' });
      return;
    }

    const userRepository = new PrismaUserRepository(prisma);
    const userService = new UserUseCase(userRepository);

    try {
      const signInUser = await userService.signin({ email, passwd });
      if (signInUser) {
        const accessToken = userService.generateToken(signInUser);
        res.status(200).json({ accessToken, user: signInUser });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
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
