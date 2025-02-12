import React, { useState } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/jobsearch.module.css"; 

const JobSearchPage: React.FC = () => {
  const [location, setLocation] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [travel, setTravel] = useState("");
  const [endorsement, setEndorsement] = useState<string>(""); 

  const router = useRouter();  

  const handleSearch = () => {
    const searchParams = {
      location,
      licenseType,
      travel,
      endorsement,  
    };

    const queryString = new URLSearchParams(searchParams).toString();

    router.push(`/searchresults?${queryString}`);

    console.log("Navigating to search results with params:", searchParams);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Location</label>
      <input
        className={styles.input}
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <label className={styles.label}>License Type</label>
      <select
        className={styles.select}
        value={licenseType}
        onChange={(e) => setLicenseType(e.target.value)}
      >
        <option value="">Pick License Class</option>
        <option value="Class A">Class A</option>
        <option value="Class B">Class B</option>
        <option value="Class C">Class C</option>
      </select>

      <label className={styles.label}>CDL Endorsements</label>
      <select
        className={styles.select}
        value={endorsement}
        onChange={(e) => setEndorsement(e.target.value)}
      >
        <option value="">Select Endorsement</option>
        <option value="N">N - Tank vehicle endorsement</option>
        <option value="H">H - Hazardous materials endorsement</option>
        <option value="X">X - Tanker/HazMat combination endorsement</option>
        <option value="T">T - Doubles/triples endorsement</option>
        <option value="P">P - Passenger transport endorsement</option>
        <option value="S">S - School bus endorsement</option>
      </select>

      <label className={styles.label}>Travel Willingness</label>
      <input
        className={styles.input}
        placeholder="Enter travel willingness"
        value={travel}
        onChange={(e) => setTravel(e.target.value)}
      />

      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default JobSearchPage;
