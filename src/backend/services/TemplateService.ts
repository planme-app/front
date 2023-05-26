import {
  Template,
  PostTemplateRequest,
  TemplateResponse
} from 'models/Template';
import { TemplateRepository } from 'repositories/TemplateRepository';

export class TemplateUseCase {
  constructor(private templateRepository: TemplateRepository) {}

  async getTemplate() {
    const templates = await this.templateRepository.getTemplate();
    const groupedBySection = this.groupBySection(templates);
    return groupedBySection;
  }

  groupBySection(templates: Template[]) {
    const init: { [index: string]: TemplateResponse[] } = {};
    const result = templates.reduce((groupTemplate, template) => {
      const { section } = template;
      if (groupTemplate[section]) {
        groupTemplate[section].push({
          routineTemplateId: template.routine_template_id,
          title: template.title,
          logoUrl: template.logo_url,
          section: template.section,
          type: template.type
        });
      } else {
        groupTemplate[section] = [
          {
            routineTemplateId: template.routine_template_id,
            title: template.title,
            logoUrl: template.logo_url,
            section: template.section,
            type: template.type
          }
        ];
      }
      return groupTemplate;
    }, init);
    return result;
  }

  async getTemplateById(routine_template_id: string) {
    const template = await this.templateRepository.getTemplateById(
      routine_template_id
    );
    return {
      routineTemplateId: template?.routine_template_id,
      title: template?.title,
      logoUrl: template?.logo_url,
      section: template?.section,
      type: template?.type
    };
  }

  async postTemplate(template: PostTemplateRequest) {
    const createdTemplate = await this.templateRepository.createTemplate(
      template
    );
    return {
      routineTemplateId: createdTemplate?.routine_template_id,
      title: createdTemplate?.title,
      logoUrl: createdTemplate?.logo_url,
      section: createdTemplate?.section,
      type: createdTemplate?.type
    };
  }
}
