// PaperListings.jsx
import { useState, useEffect } from 'react';
import React from 'react';
import PaperListing from './PaperListing';
import Loader from './Loader';

const PaperListings = ({ papers }) => {

    const [loading, setLoading] = useState(false);
    return (
        <section className='bg-blue-50 px-4 py-10'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
                    My Papers
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {papers.map((paper) => (
                        <PaperListing key={paper.id} paper={paper} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PaperListings;