import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type ApiResponse<T = any> = {
  item?: T;
  error?: string;
};

type User = {
  u_userid: string;
  u_loginid: string;
  u_passwd: string;
  u_email: string;
  u_name: string;
  u_date: Date;
};

const prisma = new PrismaClient();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User[]>>
) => {
  if (req.method === 'GET') {
    try {
      const users: User[] = await prisma.user_tb.findMany();
      res.status(200).json({ item: users });
    } catch (error: unknown) {
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
