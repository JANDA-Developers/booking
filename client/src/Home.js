import React from 'react';
import { Query } from 'react-apollo';
import { HOME_PAGE } from './queries';

const Home = () => (<Query query={ HOME_PAGE }>
    {({loading, data, err}) => {
        if(loading) return <span>Loading</span>;
        if(err) return <span>Something Happened</span>;
        return data.bookers.map(booker => (
            <h2 key={booker.id}>
                { booker.name } / { booker.phone_num }
            </h2>
        ));
    }}
    </Query>
);

export default Home;