import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;  // Get the job ID from the query

  if (req.method === 'DELETE') {
    if (!id) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    try {
      // Convert id to a number
      const jobId = Array.isArray(id) ? id[0] : id;  // Ensure it's a single value
      const deletedJob = await prisma.job.delete({
        where: {
          id: Number(jobId), // Convert the ID to a number
        },
      });
      res.status(200).json(deletedJob);
    } catch (error) {
      console.error('Error deleting job:', error);  // Log the error for debugging
      res.status(500).json({ error: 'Error deleting job' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
