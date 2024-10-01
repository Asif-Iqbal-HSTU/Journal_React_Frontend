import Hero from '../components/Hero';
import { useEffect, useState } from 'react';

import HomeCards from '../components/HomeCards';
import JobListings from '../components/JobListings';
import ViewAllJobs from '../components/ViewAllJobs';

const HomePage = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check login status on component mount
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true); // Set to true if user is logged in
    }
  }, []);

  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};
export default HomePage;
