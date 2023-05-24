import { RoutineType as PrismaRoutineType } from '@prisma/client';

export interface Routine {
  routine_id: string;
  user_id: string;
  title: string;
  type: PrismaRoutineType;
  is_repeat: boolean;
  days_of_week_binary: string;
  created_at: Date;
  deleted_at: Date | null;
}

export interface RoutineInstance {
  routine_instance_id: string;
  routine_id: string;
  created_at: Date;
}

export interface RoutineInstanceWithGoal {
  routine_instance_id: string;
  created_at: Date;
  goal: boolean | number;
  progress: boolean | number;
}
