import { PrismaClient } from '@prisma/client';
import { Routine } from 'models/Routine';
import { RoutineRepository } from 'repositories/RoutineRepository';

export class PrismaRoutineRepository implements RoutineRepository {
  constructor(private prisma: PrismaClient) {}

  async getRoutinesByUserId(user_id: string): Promise<Routine[]> {
    const routine = await this.prisma.routine.findMany({
      where: { user_id: user_id }
    });

    return routine;
  }
}
