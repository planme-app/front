import {
  Routine,
  RoutineInstance,
  RoutineInstanceWithGoal
} from 'models/Routine';

export interface RoutineInstanceRepository {
  getRoutineInstance(routine: Routine): Promise<RoutineInstanceWithGoal | null>;
  addRoutineInstance(routine_id: string): Promise<RoutineInstance>;
  addTimeRoutineInstance(
    routine_instance_id: string,
    goal: number
  ): Promise<RoutineInstanceWithGoal>;
  addCountRoutineInstance(
    routine_instance_id: string,
    goal: number
  ): Promise<RoutineInstanceWithGoal>;
  addBoolRoutineInstance(
    routine_instance_id: string,
    goal: boolean
  ): Promise<RoutineInstanceWithGoal>;
  editTimeRoutineInstance(
    routine_instance_id: string,
    progress: number
  ): Promise<RoutineInstanceWithGoal | null>;
  editCountRoutineInstance(
    routine_instance_id: string,
    progress: number
  ): Promise<RoutineInstanceWithGoal | null>;
  editBoolRoutineInstance(
    routine_instance_id: string,
    progress: boolean
  ): Promise<RoutineInstanceWithGoal | null>;
  getRoutineInstanceById(
    routine_instance_id: string
  ): Promise<RoutineInstance | null>;
}
