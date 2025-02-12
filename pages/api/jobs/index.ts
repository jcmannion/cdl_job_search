// pages/api/jobs/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const jobs = await prisma.job.findMany(); // Fetch all jobs from the database
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching jobs' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
