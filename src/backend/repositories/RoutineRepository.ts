import { Routine } from 'models/Routine';

export interface RoutineRepository {
  getRoutinesByUserId(user_id: string): Promise<Routine[]>;
}
