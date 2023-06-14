import { PrismaClient } from '@prisma/client';
import { Routine } from 'models/Routine';
import { RoutineRepository } from 'repositories/RoutineRepository';
import { RoutineType as PrismaRoutineType } from '@prisma/client';

export class PrismaRoutineRepository implements RoutineRepository {
  constructor(private prisma: PrismaClient) {}

  async getRoutinesByUserId(user_id: string): Promise<Routine[]> {
    const routine = await this.prisma.routine.findMany({
      where: { user_id: user_id }
    });

    return routine;
  }

  async addRoutine(
    user_id: string,
    title: string,
    type: PrismaRoutineType,
    daysOfWeek: string
  ): Promise<Routine> {
    const addedRoutine = await this.prisma.routine.create({
      data: {
        user_id,
        title,
        type,
        is_repeat: true,
        days_of_week_binary: daysOfWeek
      }
    });

    return addedRoutine;
  }
}
