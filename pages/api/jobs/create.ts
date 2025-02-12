// pages/api/jobs/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, location, license, endorsements, travel } = req.body;
    try {
      const newJob = await prisma.job.create({
        data: { title, location, license, endorsements, travel },
      });
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ error: 'Error creating job' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
