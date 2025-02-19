import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location, license, travel, endorsements } = req.query;

  try {

    const allJobs = await prisma.job.findMany();

    const filteredJobs = allJobs.filter((job) => {
      let match = true;

      if (location && job.location !== location) match = false;
      if (license && job.license !== license) match = false;
      if (travel && job.travel !== travel) match = false;

      if (endorsements) {
        const selectedEndorsements = Array.isArray(endorsements)
          ? endorsements
          : endorsements.split(',');

        const jobEndorsements = job.endorsements.split(','); 

        const endorsementMatch = selectedEndorsements.some((selected) =>
          jobEndorsements.includes(selected)
        );

        if (!endorsementMatch) match = false;
      }

      return match;
    });

    res.status(200).json(filteredJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);  
    res.status(500).json({ error: 'Error fetching jobs', details: error || error });
  }
}
