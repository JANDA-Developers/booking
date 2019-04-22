import React from 'react';
import DynamicImport from '../utils/DynamicImport';
import Preloader from '../atoms/preloader/Preloader';

export const Reservation = (props: any) => (
  <DynamicImport load={() => import('./outPages/Reservation')}>
    {(DNcompoent: any) => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const temp = () => {};
