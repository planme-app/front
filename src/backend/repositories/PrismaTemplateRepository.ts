import { PrismaClient } from '@prisma/client';
import { Template, PostTemplateRequest } from 'models/Template';
import { TemplateRepository } from 'repositories/TemplateRepository';

export class PrismaTemplateRepository implements TemplateRepository {
  constructor(private prisma: PrismaClient) {}

  async getTemplate(): Promise<Template[]> {
    const template = await this.prisma.routine_template.findMany();
    return template;
  }

  async getTemplateById(routine_template_id: string): Promise<Template | null> {
    const template = await this.prisma.routine_template.findUnique({
      where: { routine_template_id }
    });
    return template;
  }

  async createTemplate(template: PostTemplateRequest): Promise<Template> {
    const createTemplate = await this.prisma.routine_template.create({
      data: template
    });
    return createTemplate;
  }
}
