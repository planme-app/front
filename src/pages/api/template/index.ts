import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { TemplateUseCase } from 'services/TemplateService';
import { PrismaTemplateRepository } from 'repositories/PrismaTemplateRepository';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const templateRepository = new PrismaTemplateRepository(prisma);
  const templateService = new TemplateUseCase(templateRepository);

  if (req.method === 'POST') {
    const { title, section, logoUrl, type } = req.body;

    try {
      const newTemplate = await templateService.postTemplate({
        title,
        section,
        logo_url: logoUrl,
        type
      });
      res.status(201).json({ data: newTemplate });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const routines = await templateService.getTemplate();
      res.status(200).json(routines);
    } catch (error) {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
