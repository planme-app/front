import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { UserUseCase } from 'services/UserService';
import { RoutineUseCase } from 'services/RoutineService';
import { PrismaUserRepository } from 'repositories/PrismaUserRepository';
import { PrismaRoutineRepository } from 'repositories/PrismaRoutineRepository';
import { PrismaRoutineInstanceRepository } from 'repositories/PrismaRoutineInstanceRepository';
import { isValidDate } from '@/backend/utils/dateUtil';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { userId, date } = req.query;

    const userRepository = new PrismaUserRepository(prisma);
    const userService = new UserUseCase(userRepository);

    const routineRepository = new PrismaRoutineRepository(prisma);
    const routineInstanceRepository = new PrismaRoutineInstanceRepository(
      prisma
    );
    const routineService = new RoutineUseCase(
      routineRepository,
      routineInstanceRepository
    );

    if (!isValidDate(date as string)) {
      return res.status(400).json({
        error:
          "Invalid request: 'date' query parameter must be in YYYY-MM-DD format."
      });
    }

    try {
      const user = await userService.getUserById(userId as string);
      if (!user) {
        return res
          .status(404)
          .json({ error: 'User with provided ID not found.' });
      }

      const routines = await routineService.getTodayRoutine(userId as string);
      res.status(200).json(routines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
