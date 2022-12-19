import ContentLoader from 'react-content-loader';

const Skeleton = (props) => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="140" cy="130" r="125" />
      <rect x="0" y="276" rx="5" ry="5" width="280" height="25" />
      <rect x="0" y="308" rx="5" ry="5" width="280" height="88" />
      <rect x="0" y="422" rx="5" ry="5" width="90" height="30" />
      <rect x="126" y="415" rx="10" ry="10" width="150" height="45" />
    </ContentLoader>
  );
};

export default Skeleton;
