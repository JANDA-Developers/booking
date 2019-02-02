import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Booker, GetBookerNameById } from '../queries';
import Detail from './Detail';
import JDutils from '../utils/utils';
import CheckBox from '../atoms/forms/CheckBox';

// eslint-disable-next-line react/prop-types
const Home = ({ history, match: { params } }) => (
  <Fragment>
    {JDutils.isEmpty(params) ? (
      <Fragment>
        <Query query={Booker}>
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
                    history.push('detail/파라미터');
                  }}
                >
                  {'버튼 TO Post'}
                </button>
                <CheckBox />
              </Fragment>
            );
          }}
        </Query>
        <Query query={GetBookerNameById} variables={{ personId: '5c330463ed83c143088c499a' }}>
          {({ loading, error }) => {
            if (loading) return 'loading';
            if (error) return 'wrong component';
            return 'hi';
          }}
        </Query>
      </Fragment>
    ) : (
      <Detail />
    )}
  </Fragment>
);

const Bookers = ({ data }) => {
  const compoent = data.bookers.map(booker => (
    <h3 key={booker.id}>
      {'BookerName:'}
      {booker.name}
    </h3>
  ));
  return compoent;
};

export default Home;
