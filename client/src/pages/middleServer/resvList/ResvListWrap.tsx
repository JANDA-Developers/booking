import React from 'react';
import { Query } from 'react-apollo';
import ResvList from './ResvList';
import { IHouse } from '../../../types/interface';
import { getBookers, getBookersVariables } from '../../../types/api';
import { showError, QueryDataFormater } from '../../../utils/utils';
import { GET_BOOKERS } from '../../../queries';

interface IProps {
  houseId: string;
}

class GetBookersQuery extends Query<getBookers, getBookersVariables> {}

const ResvListWrap: React.SFC<IProps> = ({ houseId }) => (
  <GetBookersQuery fetchPolicy="network-only" query={GET_BOOKERS} variables={{ houseId, page: 1, count: 50 }}>
    {({ data: boookerData, loading, error }) => {
      console.log('boookerData');
      console.log(boookerData);
      showError(error);
      const bookers = QueryDataFormater(boookerData, 'GetBookers', 'bookers', undefined);
      const pageInfo = QueryDataFormater(boookerData, 'GetBookers', 'pageInfo', undefined);
      return <ResvList pageInfo={pageInfo || undefined} bookersData={bookers || []} loading={loading} />;
    }}
  </GetBookersQuery>
);

export default ResvListWrap;
