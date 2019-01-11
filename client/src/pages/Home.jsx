import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import BOOKER from '../queries';

// eslint-disable-next-line react/prop-types
const Home = ({ history }) => (
  <Fragment>
    <Query query={BOOKER}>
      {({ loading, data, error }) => {
        if (loading) return 'loading';
        if (error) return 'wrong component';
        return (
          <Fragment>
            <h1>hellow this is a home.jsx</h1>
            <Bookers data={data} />
            <button
              type="button"
              onClick={() => {
                history.push('/파라미터');
              }}
            >
              {'버튼 TO Post'}
            </button>
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
);

const Bookers = ({ data }) => {
  console.log(data);
  const compoent = data.bookers.map(booker => (
    <h3 key={data.id}>
      {'BookerName:'}
      {booker.name}
    </h3>
  ));
  return compoent;
};

export default Home;
