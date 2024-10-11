// PaperPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaperPage = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/paper/${id}`);
        setPaper(response.data);
      } catch (error) {
        console.error('Error fetching paper:', error);
      }
    };

    fetchPaper();
  }, [id]);

  if (!paper) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{paper.title}</h1>
      <p>Type: {paper.type}</p>
      <p>Classification: {paper.classification}</p>
      <p>Abstract: {paper.abstract}</p>
      <p>Keywords: {paper.keywords}</p>
      {/* Include other details as needed */}
    </div>
  );
};

export default PaperPage;
