// PaperListing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PaperListing = ({ paper }) => {
  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          <h2 className='text-xl font-bold'>{paper.title}</h2>
          <p>Type: {paper.type}</p>
          <p>Type: {paper.user_id}</p>
          <p>Classification: {paper.classification}</p>
          <p>Abstract: {paper.abstract.substring(0, 100)}...</p>
          {/* <Link to={`/paper/${paper.id}`}>Learn more</Link> */}
          <Link
            to={`/paper/${paper.id}`}
            className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaperListing;
