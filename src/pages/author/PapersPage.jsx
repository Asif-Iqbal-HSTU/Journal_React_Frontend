// PapersPage.jsx
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from '../../axios'
// import PaperListings from './PaperListings';
import PaperListings from '../../components/PaperListings';
import Loader from '../../components/Loader';

const PapersPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user.role);
      if (user && user.id) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/papers/${user.id}`);
          setPapers(response.data);
          setLoading(false);
          //console.log(response.data)
        } catch (error) {
          console.error('Error fetching papers:', error);
        }
      }
    };

    fetchPapers();
  }, []);

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div>
          <PaperListings papers={papers} />
        </div>
      )}

    </>
  );
};

export default PapersPage;
