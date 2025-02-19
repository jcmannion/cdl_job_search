import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/jobdetails.module.css';

interface Job {
  id: number;
  title: string;
  location: string;
  license: string;
  endorsements: string | string[];
  travel: string;
}

const JobDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; 
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await axios.get<Job>(`/api/jobs/${id}`);
          setJob(response.data);
        } catch (err) {
          setError('Error fetching job details: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
          setLoading(false);
        }
      };

      fetchJobDetails();
    }
  }, [id]); 

  if (loading) {
    return (
      <div className={styles.centered}>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className={styles.centered}>
        <p>No job details found.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{job.title}</h1>
      <p className={styles.location}>{job.location}</p>
      <p className={styles.license}>License: {job.license}</p>
      <p className={styles.endorsements}>Endorsements: {Array.isArray(job.endorsements) ? job.endorsements.join(', ') : job.endorsements}</p>
      <p className={styles.travel}>Travel: {job.travel}</p>
    </div>
  );
};

export default JobDetailsPage;
