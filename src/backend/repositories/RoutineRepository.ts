import { Routine } from 'models/Routine';
import { RoutineType as PrismaRoutineType } from '@prisma/client';

export interface RoutineRepository {
  getRoutinesByUserId(user_id: string): Promise<Routine[]>;
  addRoutine(
    user_id: string,
    title: string,
    type: PrismaRoutineType,
    daysOfWeek: string
  ): Promise<Routine>;
}
