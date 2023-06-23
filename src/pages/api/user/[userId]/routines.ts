import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { UserUseCase } from 'services/UserService';
import { RoutineUseCase } from 'services/RoutineService';
import { PrismaUserRepository } from 'repositories/PrismaUserRepository';
import { PrismaRoutineRepository } from 'repositories/PrismaRoutineRepository';
import { PrismaRoutineInstanceRepository } from 'repositories/PrismaRoutineInstanceRepository';
import { isValidDate } from '@/backend/utils/dateUtil';
import { RoutineType as PrismaRoutineType } from '@prisma/client';

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

      const routines = await routineService.getDateRoutines(
        userId as string,
        date as string
      );
      return res.status(200).json(routines);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Unexpected error occurred' });
    }
  } else if (req.method === 'POST') {
    const { userId } = req.query;
    const { title, type, daysOfWeek, goal } = req.body;

    const errors = [];

    if (!title || typeof title !== 'string') {
      errors.push({
        field: 'title',
        message: 'Title is required and should be a string'
      });
    }
    if (!type || !Object.values(PrismaRoutineType).includes(type)) {
      errors.push({
        field: 'type',
        message: 'Type is required and Invalid type'
      });
    }
    if (
      !daysOfWeek ||
      !Array.isArray(daysOfWeek) ||
      !daysOfWeek.every((item) => typeof item === 'string')
    ) {
      errors.push({
        field: 'daysOfWeek',
        message: 'DaysOfWeek is required and should be an array of strings'
      });
    }
    if (!goal || typeof goal !== 'string') {
      errors.push({
        field: 'goal',
        message: 'Goal is required and should be a string'
      });
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    const userRepository = new PrismaUserRepository(prisma);
    const routineRepository = new PrismaRoutineRepository(prisma);
    const routineInstanceRepository = new PrismaRoutineInstanceRepository(
      prisma
    );

    const userService = new UserUseCase(userRepository);
    const routineService = new RoutineUseCase(
      routineRepository,
      routineInstanceRepository
    );

    try {
      const user = await userService.getUserById(userId as string);
      if (!user) {
        return res
          .status(404)
          .json({ error: 'User with provided ID not found.' });
      }
      const newRoutine = await routineService.addRoutine(
        userId as string,
        title,
        type,
        daysOfWeek,
        goal
      );
      return res.status(201).json({ routine: newRoutine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
