import { Template } from 'models/Template';
import { TemplateRepository } from '../repositories/TemplateRepository';

export class TemplateUseCase {
  constructor(private templateRepository: TemplateRepository) {}

  async getTemplate() {
    const templates = await this.templateRepository.getTemplate();
    const groupedBySection = this.groupBySection(templates);
    return {
      data: groupedBySection
    };
  }

  groupBySection(templates: Template[]) {
    const init: { [index: string]: Template[] } = {};
    const result = templates.reduce((groupTemplate, template) => {
      const { section } = template;
      if (groupTemplate[section]) {
        groupTemplate[section].push(template);
      } else {
        groupTemplate[section] = [template];
      }
      return groupTemplate;
    }, init);
    return result;
  }
}
