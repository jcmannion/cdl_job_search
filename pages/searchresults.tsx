import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/searchresults.module.css';

interface Job {
  id: number;
  title: string;
  location: string;
  license: string;
  endorsements: string | string[]; 
  travel: string;
}

const SearchResultsPage: React.FC = () => {
  const router = useRouter();
  const { location, licenseType, travel, endorsement } = router.query;

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const queryParams: any = {};

        if (location) queryParams.location = location;
        if (licenseType) queryParams.licenseType = licenseType;
        if (travel) queryParams.travel = travel;
        if (endorsement) queryParams.endorsements = endorsement;  

        const response = await axios.get<Job[]>('/api/jobs/search', { params: queryParams });

        setFilteredJobs(response.data);
      } catch (err) {
        setError('Error fetching jobs: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [location, licenseType, travel, endorsement]);

  if (loading) {
    return (
      <div className={styles.centered}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <h2 className={styles.errorText}>{error}</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header} style={{ textAlign: 'center' }}>Search Results</h1>
      {filteredJobs.length > 0 ? (
        <ul className={styles.jobList}>
          {filteredJobs.map((item) => (
            <li key={item.id} className={styles.jobCard}>
              <h2>{item.title}</h2>
              <p><strong>Location: </strong>{item.location}</p>
              <p><strong>License: </strong>{item.license}</p>
              <p><strong>Endorsements: </strong>
                {Array.isArray(item.endorsements) ? item.endorsements.join(', ') : item.endorsements}
              </p>
              <p><strong>Travel: </strong>{item.travel}</p>
              <Link href={`/jobdetails?id=${item.id}`} className={styles.jobButton}>
                View Full Job Listing
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center' }}>No jobs found. Please check back later.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
