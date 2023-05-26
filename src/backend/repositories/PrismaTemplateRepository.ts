import { PrismaClient } from '@prisma/client';
import { Template } from 'models/Template';
import { TemplateRepository } from 'repositories/TemplateRepository';

export class PrismaTemplateRepository implements TemplateRepository {
  constructor(private prisma: PrismaClient) {}

  async getTemplate(): Promise<Template[]> {
    const template = await this.prisma.routine_template.findMany();

    return template;
  }

  async getTemplateById(routine_template_id: string): Promise<Template[]> {
    const template = await this.prisma.routine_template.findMany({
      where: { routine_template_id: routine_template_id }
    });

    return template;
  }
}
