import React from 'react';
import ResvList from './ResvList';
import { IHouse } from '../../../types/interface';

interface IProps {
  selectedHouse: IHouse;
}

const ResvListWrap: React.SFC<IProps> = ({ selectedHouse }) => <ResvList />;

export default ResvListWrap;
