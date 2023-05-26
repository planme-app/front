import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { TemplateUseCase } from 'services/TemplateService';
import { PrismaTemplateRepository } from 'repositories/PrismaTemplateRepository';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { routineTemplateId } = req.query;
    const templateRepository = new PrismaTemplateRepository(prisma);
    const templateService = new TemplateUseCase(templateRepository);

    try {
      const routines = await templateService.getTemplateById(
        routineTemplateId as string
      );
      res.status(200).json(routines);
    } catch (error) {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
