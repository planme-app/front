import {
  PrismaClient,
  bool_routine_instance,
  count_routine_instance,
  time_routine_instance
} from '@prisma/client';
import {
  Routine,
  RoutineInstance,
  RoutineInstanceWithGoal
} from 'models/Routine';
import { RoutineInstanceRepository } from 'repositories/RoutineInstanceRepository';

export class PrismaRoutineInstanceRepository
  implements RoutineInstanceRepository
{
  constructor(private prisma: PrismaClient) {}

  async getRoutineInstance(
    routine: Routine
  ): Promise<RoutineInstanceWithGoal | null> {
    const routineInstance = await this.prisma.routine_instance.findFirst({
      where: { routine_id: routine.routine_id }
    });

    if (!routineInstance) {
      return null;
    }

    let routineInstanceGoal:
      | bool_routine_instance
      | count_routine_instance
      | time_routine_instance
      | null = null;

    if (routine.type === 'bool') {
      routineInstanceGoal = await this.prisma.bool_routine_instance.findFirst({
        where: { routine_instance_id: routineInstance.routine_instance_id }
      });
    } else if (routine.type === 'count') {
      routineInstanceGoal = await this.prisma.count_routine_instance.findFirst({
        where: { routine_instance_id: routineInstance.routine_instance_id }
      });
    } else if (routine.type === 'time') {
      routineInstanceGoal = await this.prisma.time_routine_instance.findFirst({
        where: { routine_instance_id: routineInstance.routine_instance_id }
      });
    }

    if (routineInstanceGoal) {
      return {
        routine_instance_id: routineInstance.routine_instance_id,
        goal: routineInstanceGoal.goal,
        progress: routineInstanceGoal.progress
      };
    } else {
      throw Error('routine_instance is not created.');
    }
  }

  async addRoutineInstance(routine_id: string): Promise<RoutineInstance> {
    const routineInstance = await this.prisma.routine_instance.create({
      data: {
        routine_id
      }
    });
    return routineInstance;
  }

  async addTimeRoutineInstance(
    routine_instance_id: string,
    goal: number
  ): Promise<RoutineInstanceWithGoal> {
    const addTimeRoutineInstance = this.prisma.time_routine_instance.create({
      data: { routine_instance_id, goal, progress: 0 }
    });
    return addTimeRoutineInstance;
  }

  async addCountRoutineInstance(
    routine_instance_id: string,
    goal: number
  ): Promise<RoutineInstanceWithGoal> {
    const addCountRoutineInstance = this.prisma.count_routine_instance.create({
      data: { routine_instance_id, goal, progress: 0 }
    });
    return addCountRoutineInstance;
  }

  async addBoolRoutineInstance(
    routine_instance_id: string,
    goal: boolean
  ): Promise<RoutineInstanceWithGoal> {
    const addBoolRoutineInstance = this.prisma.bool_routine_instance.create({
      data: { routine_instance_id, goal, progress: false }
    });
    return addBoolRoutineInstance;
  }
}
