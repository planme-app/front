import { RoutineType as PrismaRoutineType } from '@prisma/client';

export interface Template {
  routine_template_id: string;
  title: string;
  section: string;
  logo_url: string;
  type: PrismaRoutineType;
}
