import { Template } from 'models/Template';

export interface TemplateRepository {
  getTemplate(): Promise<Template[]>;

  getTemplateById(routine_template_id: string): Promise<Template | null>;
}
