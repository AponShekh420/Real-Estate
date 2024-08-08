import dynamic from 'next/dynamic';

const ContentLoader = dynamic(() => import('react-content-loader'), { ssr: false });


const ContentLoaderWrapper = () => {
  return (
    <ContentLoader viewBox="0 0 400 150" height={200} width={500} >
      <rect x="0" y="15" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="40" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="65" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="90" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="115" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="140" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="165" rx="5" ry="5" width="220" height="10" />
    </ContentLoader>
  );
}

export default ContentLoaderWrapper;