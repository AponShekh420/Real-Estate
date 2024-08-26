import React from 'react';
import dynamic from 'next/dynamic';

const ContentLoader = dynamic(() => import('react-content-loader'), { ssr: false });

const CommunitiesListLoader = () => {
  return (
    <div className="h-100 w-100 row">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-6 mt25">
          <ContentLoader 
            viewBox="0 0 390 330" 
            height="100%" 
            width="100%" 
            backgroundColor="#dee2e6" 
            foregroundColor="#ecebeb"
          >
            <rect x="3" y="3" rx="10" ry="10" width="100%" height="70%" />
            <rect x="4" y="240" rx="0" ry="20" width="75%" height="6%" />
            <rect x="4" y="265" rx="0" ry="0" width="60%" height="6%" />
            <rect x="4" y="290" rx="0" ry="0" width="70%" height="6%" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};

export default CommunitiesListLoader;
