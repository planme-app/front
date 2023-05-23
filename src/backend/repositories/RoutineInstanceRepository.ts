import { Routine, RoutineInstanceWithGoal } from 'models/Routine';

export interface RoutineInstanceRepository {
  getRoutineInstance(routine: Routine): Promise<RoutineInstanceWithGoal | null>;
}
