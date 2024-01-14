import React from 'react';
import { useSelector } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';

const GlobalLoading = () => {
  const loading = useSelector(
    (state: { shared: { loading: boolean } }) => state.shared.loading
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading && (
        <div
          style={{ width: '100vw', zIndex: 9999 }}
          className="fixed h-screen top-0 left-0 grid place-items-center"
        >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            // color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </>
  );
};

export default GlobalLoading;
