import { Routine } from 'models/Routine';
import { RoutineRepository } from 'repositories/RoutineRepository';
import { RoutineInstanceRepository } from 'repositories/RoutineInstanceRepository';
import { utcToZonedTime } from 'date-fns-tz';
import { getDay } from 'date-fns';

export class RoutineUseCase {
  constructor(
    private routineRepository: RoutineRepository,
    private routineInstanceRepository: RoutineInstanceRepository
  ) {}

  async getTodayRoutine(userId: string) {
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const routines = await this.routineRepository.getRoutinesByUserId(userId);
    const filteredTodayRoutines = this.filterTodayRoutines(routines);
    return filteredTodayRoutines.map(async (routine) => {
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
        days_of_week: daysOfWeek
      };
    });
  }

  filterTodayRoutines(routines: Routine[]) {
    const koreaTime = utcToZonedTime(new Date(), 'Asia/Seoul');
    const day = getDay(koreaTime);
    return routines.filter(
      (routine) => routine.days_of_week_binary.charAt(day) === '1'
    );
  }
}
