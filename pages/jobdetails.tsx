import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import axios from 'axios'; 
import styles from '../styles/jobdetails.module.css'; 

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  license: string;
  description: string;
}

const JobDetailsPage: React.FC = () => {
  const router = useRouter();
  const { jobId } = router.query; 
  const [job, setJob] = useState<Job | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        try {

          const response = await axios.get<Job>(`http://localhost:5000/api/jobs/${jobId}`);
          setJob(response.data); 
        } catch (err) {
          console.error("Error fetching job details:", err);
          setError('Error fetching job details: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
          setLoading(false);
        }
      };

      fetchJobDetails(); 
    }
  }, [jobId]); 

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
      <p className={styles.company}>{job.company}</p>
      <p>{job.location}</p>
      <p>License: {job.license}</p>
      <p>Description: {job.description}</p>
    </div>
  );
};

export default JobDetailsPage;
