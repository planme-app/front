import {
  Routine,
  RoutineInstance,
  RoutineInstanceWithGoal
} from 'models/Routine';
import { RoutineRepository } from 'repositories/RoutineRepository';
import { RoutineInstanceRepository } from 'repositories/RoutineInstanceRepository';
import { utcToZonedTime } from 'date-fns-tz';
import { getDay, parseISO } from 'date-fns';
import { RoutineType as PrismaRoutineType } from '@prisma/client';

export class RoutineUseCase {
  constructor(
    private routineRepository: RoutineRepository,
    private routineInstanceRepository: RoutineInstanceRepository
  ) {}

  async addRoutine(
    userId: string,
    title: string,
    type: PrismaRoutineType,
    daysOfWeek: string[],
    goal: string
  ) {
    // 1. create routine
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const daysOfWeekBinary = days
      .map((day) =>
        daysOfWeek.find((inputDay) => inputDay === day) ? '1' : '0'
      )
      .join('');

    const routine = await this.routineRepository.addRoutine(
      userId,
      title,
      type,
      daysOfWeekBinary
    );

    // 2. create routine_instance
    const routineInstance =
      await this.routineInstanceRepository.addRoutineInstance(
        routine.routine_id
      );

    let routineTypeInstance: RoutineInstanceWithGoal;
    // 3. create type_routine_instance
    switch (routine.type) {
      case 'time':
        routineTypeInstance =
          await this.routineInstanceRepository.addTimeRoutineInstance(
            routineInstance.routine_instance_id,
            Number(goal)
          );
        break;

      case 'count':
        routineTypeInstance =
          await this.routineInstanceRepository.addCountRoutineInstance(
            routineInstance.routine_instance_id,
            Number(goal)
          );
        break;

      case 'bool':
        routineTypeInstance =
          await this.routineInstanceRepository.addBoolRoutineInstance(
            routineInstance.routine_instance_id,
            goal === 'true'
          );
        break;
      default:
        throw new Error('routine의 타입이 정확하지 않습니다.');
    }

    const res = {
      routine_instance_id: routineInstance.routine_instance_id,
      created_at: routineInstance.created_at,
      title: routine.title,
      type: routine.type,
      days_of_week: daysOfWeek,
      goal: routineTypeInstance.goal,
      progress: routineTypeInstance.progress
    };

    return res;
  }

  async getDateRoutines(userId: string, date: string) {
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const routines = await this.routineRepository.getRoutinesByUserId(userId);
    const paramDate = parseISO(date);
    const routinesPromises = this.filterDateRoutines(routines, paramDate).map(
      async (routine) => {
        const daysOfWeek = routine.days_of_week_binary
          .split('')
          .map((binaryDay, idx) => {
            if (binaryDay === '1') {
              return day[idx];
            }
            return binaryDay;
          })
          .filter((d) => d !== '0');
        const routineInstance =
          await this.routineInstanceRepository.getRoutineInstance(routine);
        return {
          ...routineInstance,
          title: routine.title,
          type: routine.type,
          days_of_week: daysOfWeek,
          created_at: routine.created_at
        };
      }
    );
    return Promise.all(routinesPromises);
  }

  private filterDateRoutines(routines: Routine[], date: Date): Routine[] {
    const koreaTime = utcToZonedTime(date, 'Asia/Seoul');
    const day = getDay(koreaTime);
    return routines.filter(
      (routine) => routine.days_of_week_binary.charAt(day) === '1'
    );
  }

  async getRoutineInstanceById(
    routineInstanceId: string
  ): Promise<RoutineInstance | null> {
    const routineInstance =
      this.routineInstanceRepository.getRoutineInstanceById(routineInstanceId);
    return routineInstance;
  }

  async editRoutineInstanceProgress(
    routineInstance: RoutineInstance,
    type: PrismaRoutineType,
    progress: number | boolean
  ): Promise<RoutineInstanceWithGoal> {
    let typeRoutineInstance: RoutineInstanceWithGoal | null;
    switch (type) {
      case 'time':
        typeRoutineInstance = await this.editTimeRoutineInstance(
          routineInstance.routine_instance_id,
          progress as number
        );
        break;
      case 'count':
        typeRoutineInstance = await this.editCountRoutineInstance(
          routineInstance.routine_instance_id,
          progress as number
        );
        break;
      case 'bool':
        typeRoutineInstance = await this.editBoolRoutineInstance(
          routineInstance.routine_instance_id,
          progress as boolean
        );
        break;
      default:
        throw new Error('routine의 타입이 정확하지 않습니다.');
    }

    if (!typeRoutineInstance) {
      throw new Error('routine instance 제대로 저장되지 않았습니다.');
    }
    return typeRoutineInstance;
  }

  private async editTimeRoutineInstance(
    routineInstanceId: string,
    progress: number
  ): Promise<RoutineInstanceWithGoal | null> {
    const timeRoutineInstance =
      await this.routineInstanceRepository.editTimeRoutineInstance(
        routineInstanceId,
        progress
      );

    return timeRoutineInstance;
  }

  private async editCountRoutineInstance(
    routineInstanceId: string,
    progress: number
  ): Promise<RoutineInstanceWithGoal | null> {
    const countRoutineInstance =
      await this.routineInstanceRepository.editCountRoutineInstance(
        routineInstanceId,
        progress
      );

    return countRoutineInstance;
  }

  private async editBoolRoutineInstance(
    routineInstanceId: string,
    progress: boolean
  ): Promise<RoutineInstanceWithGoal | null> {
    const boolRoutineInstance =
      await this.routineInstanceRepository.editBoolRoutineInstance(
        routineInstanceId,
        progress
      );

    return boolRoutineInstance;
  }
}
