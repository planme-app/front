import { PrismaRoutineInstanceRepository } from '@/backend/repositories/PrismaRoutineInstanceRepository';
import { PrismaRoutineRepository } from '@/backend/repositories/PrismaRoutineRepository';
import { PrismaUserRepository } from '@/backend/repositories/PrismaUserRepository';
import { RoutineUseCase } from '@/backend/services/RoutineService';
import { UserUseCase } from '@/backend/services/UserService';
import { PrismaClient, RoutineType as PrismaRoutineType } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { userId, routineInstanceId } = req.query;
    const { type, progress } = req.body;

    const errors = [];

    if (!routineInstanceId || typeof routineInstanceId !== 'string') {
      errors.push({
        field: 'routineInstanceId',
        message: 'RoutineInstanceId is required and should be a string'
      });
    }
    if (!userId || typeof userId !== 'string') {
      errors.push({
        field: 'userId',
        message: 'UserId is required and should be a string'
      });
    }
    if (!type || !Object.values(PrismaRoutineType).includes(type)) {
      errors.push({
        field: 'type',
        message: 'Type is required and Invalid type'
      });
    }
    if (typeof progress !== 'number' && typeof progress !== 'boolean') {
      errors.push({
        field: 'progress',
        message: 'progress is required and should be a number or boolean'
      });
    }
    if (typeof progress === 'number' && type === 'bool') {
      errors.push({
        field: 'progress, type',
        message: 'progress and type shoud be match'
      });
    }
    if (
      typeof progress === 'boolean' &&
      (type === 'time' || type === 'count')
    ) {
      errors.push({
        field: 'progress, type',
        message: 'progress and type shoud be match'
      });
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

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

    try {
      const user = await userService.getUserById(userId as string);
      if (!user) {
        return res
          .status(404)
          .json({ error: 'User with provided ID not found.' });
      }

      const routineInstance = await routineService.getRoutineInstanceById(
        routineInstanceId as string
      );
      if (!routineInstance) {
        return res
          .status(404)
          .json({ error: 'Routine with provided instance ID not found' });
      }

      const typeRoutineInstance =
        await routineService.editRoutineInstanceProgress(
          routineInstance,
          type,
          progress
        );

      const result = {
        routine_instance_id: routineInstance.routine_instance_id,
        type: type,
        progress: typeRoutineInstance.progress
      };

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  }
};
