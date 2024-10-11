import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Loader = ({ loading }) => {
  return (
    <ClimbingBoxLoader
      color='#4338ca'
      loading={loading}
      cssOverride={override}
      size={30}
    />
  );
};
export default Loader;
