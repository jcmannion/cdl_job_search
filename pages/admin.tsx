import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/admin.module.css'; 

interface Job {
  id: number;
  title: string;
  location: string;
  license: string;
  endorsements: string[];
  travel: string;
}

const AdminPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [license, setLicense] = useState('');
  const [endorsements, setEndorsements] = useState<string[]>([]); 
  const [travel, setTravel] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);

  const licenseOptions = ["Pick License Class", "Class A", "Class B", "Class C"];
  const endorsementOptions = ["N", "H", "X", "T", "P", "S"];

  const fetchJobs = async () => {
    try {
      const response = await axios.get<Job[]>('/api/jobs'); 
      setJobs(response.data); 
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleAddJob = async () => {
    try {
      const response = await axios.post('/api/jobs/create', {
        title,
        location,
        license,
        endorsements: endorsements.join(', '),  
        travel,
      });
      console.log('Job added successfully!', response.data);
      fetchJobs(); 
      setTitle('');
      setLocation('');
      setLicense('');
      setEndorsements([]);
      setTravel('');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleRemoveJob = async (id: number) => {
    try {
      const response = await axios.delete(`/api/jobs/${id}`);
      fetchJobs(); 
    } catch (error) {
      console.error('Error removing job:', error);
    }
  };

  const handleEndorsementChange = (endorsement: string) => {
    setEndorsements((prevEndorsements) => {
      if (prevEndorsements.includes(endorsement)) {
        return prevEndorsements.filter((item) => item !== endorsement);
      } else {
        return [...prevEndorsements, endorsement];
      }
    });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.label}>Job Title</h1>
      <input 
        type="text" 
        className={styles.input} 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Enter job title" 
      />
      
      <h2 className={styles.label}>Location</h2>
      <input 
        type="text" 
        className={styles.input} 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter location" 
      />
      
      <h2 className={styles.label}>License</h2>
      <select 
        className={styles.picker} 
        value={license} 
        onChange={(e) => setLicense(e.target.value)}
      >
        {licenseOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <h2 className={styles.label}>Endorsements</h2>
      <div className={styles.checkboxContainer}>
        {endorsementOptions.map((endorsement) => (
          <div key={endorsement} className={styles.checkboxItem}>
            <span className={styles.checkboxText}>{endorsement}</span>
            <button
              className={`${styles.checkbox} ${endorsements.includes(endorsement) ? styles.selected : ''}`}
              onClick={() => handleEndorsementChange(endorsement)}
            >
            </button>
          </div>
        ))}
      </div>

      <h2 className={styles.label}>Travel</h2>
      <input 
        type="text" 
        className={styles.input} 
        value={travel} 
        onChange={(e) => setTravel(e.target.value)} 
        placeholder="Enter travel willingness" 
      />

      <button onClick={handleAddJob} className={styles.addJobButton}>Add Job</button>
      
      {jobs.length > 0 && (
        <div className={styles.jobList}>
          {jobs.map((job) => (
            <div key={job.id} className={styles.jobItem}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <p className={styles.jobDetails}>Location: {job.location}</p>
              <p className={styles.jobDetails}>License: {job.license}</p>
              <p className={styles.jobDetails}>
                Endorsements: {Array.isArray(job.endorsements) ? job.endorsements.join(', ') : job.endorsements}
              </p>
              <p className={styles.jobDetails}>Travel: {job.travel}</p>
              <button onClick={() => handleRemoveJob(job.id)} className={styles.removeButton}>
                Remove Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
