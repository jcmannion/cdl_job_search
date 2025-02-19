import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const { id } = req.query;
    console.log('Request method:', req.method); 
    console.log('Request query:', req.query); 

    if (req.method === 'GET') {
      if (!id) {
        return res.status(400).json({ error: 'Job ID is required' });
      }

      const jobId = Array.isArray(id) ? id[0] : id;

      const job = await prisma.job.findUnique({
        where: {
          id: Number(jobId),
        },
      });

      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      res.status(200).json(job);
    } else if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'Job ID is required' });
      }

      const jobId = Array.isArray(id) ? id[0] : id;

      const deletedJob = await prisma.job.delete({
        where: {
          id: Number(jobId),
        },
      });

      res.status(200).json(deletedJob);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
