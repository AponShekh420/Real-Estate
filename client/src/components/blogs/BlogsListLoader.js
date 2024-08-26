import React from 'react'
import dynamic from 'next/dynamic';
const ContentLoader = dynamic(() => import('react-content-loader'), { ssr: false });

const BlogsListLoader = () => {
  return (
    <div className="row">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
          <ContentLoader 
            viewBox="0 0 390 330"
            style={{ width: '100%', height: 'auto' }}
            backgroundColor="#dee2e6"
            foregroundColor="#ecebeb"
          >
            <rect x="3" y="3" rx="10" ry="10" width="100%" height="70%" />
            <rect x="4" y="246" rx="0" ry="20" width="75%" height="8%" />
            <rect x="4" y="280" rx="0" ry="0" width="60%" height="8%" />
          </ContentLoader>
        </div>
      ))}
    </div>
  )
}


export default BlogsListLoader;