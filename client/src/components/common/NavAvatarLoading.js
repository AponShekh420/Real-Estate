import React from 'react';
import dynamic from 'next/dynamic';

const ContentLoader = dynamic(() => import('react-content-loader'), { ssr: false });

const CommunitiesListLoader = () => {
  return (
    <div className="w-100 row">
      <ContentLoader 
        viewBox="0 0 400 120" 
        height={60} 
        width={400} 
        backgroundColor="#dee2e6" 
        foregroundColor="#ecebeb"
        className='bdrb1'
      >
        <rect x="110" y="21" rx="4" ry="4" width="254" height="6" />
        <rect x="111" y="41" rx="3" ry="3" width="185" height="7" />
        <rect x="304" y="-46" rx="3" ry="3" width="350" height="6" />
        <rect x="371" y="-45" rx="3" ry="3" width="380" height="6" />
        <rect x="484" y="-45" rx="3" ry="3" width="201" height="6" />
        <circle cx="48" cy="48" r="48" />
      </ContentLoader>
      <ContentLoader
        width={"100%"}
        height={"100%"}
        viewBox="0 0 190 150"
        backgroundColor="#dee2e6" 
        foregroundColor="#ecebeb"
        className='mt10'
      >
        <rect x="35" y="10" rx="5" ry="5" width="150" height="10" />
        <rect x="35" y="45" rx="5" ry="5" width="150" height="10" />
        <rect x="35" y="80" rx="5" ry="5" width="150" height="10" />
        <rect x="35" y="115" rx="5" ry="5" width="150" height="10" />
        <rect x="3" y="5" rx="4" ry="4" width="20" height="20" />
        <rect x="3" y="40" rx="4" ry="4" width="20" height="20" />
        <rect x="3" y="75" rx="4" ry="4" width="20" height="20" />
        <rect x="3" y="110" rx="4" ry="4" width="20" height="20" />
      </ContentLoader>
    </div>
  );
};

export default CommunitiesListLoader;
