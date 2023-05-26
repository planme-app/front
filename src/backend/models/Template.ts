import { RoutineType as PrismaRoutineType } from '@prisma/client';

export interface Template {
  routine_template_id: string;
  title: string;
  section: string;
  logo_url: string;
  type: PrismaRoutineType;
}

export interface TemplateResponse {
  routineTemplateId: string;
  title: string;
  section: string;
  logoUrl: string;
  type: PrismaRoutineType;
}

export interface PostTemplateRequest {
  title: string;
  section: string;
  logo_url: string;
  type: PrismaRoutineType;
}
