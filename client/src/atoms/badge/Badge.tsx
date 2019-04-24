import React from 'react';
import './Badge.scss';
import classnames from 'classnames';

// 이거보다는 풀어서 넣는게 좋을것 같다.
export enum BADGE_THEMA {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ERROR = 'error',
  NEW = 'new',
  WHITE = 'white',
  BLACK = 'black',
}

interface IProps {
  thema: BADGE_THEMA;
  className?: string;
  children: string | Node;
}

const JDbadge: React.SFC<IProps> = ({
  className, thema, children, ...props
}) => {
  const classNames = classnames('JDbadge', className, {
    'JDbadge--black': thema === BADGE_THEMA.BLACK,
    'JDbadge--white': thema === BADGE_THEMA.WHITE,
    'JDbadge--primary': thema === BADGE_THEMA.PRIMARY,
    'JDbadge--secondary': thema === BADGE_THEMA.SECONDARY,
    'JDbadge--error': thema === BADGE_THEMA.ERROR,
    'JDbadge--new': thema === BADGE_THEMA.NEW,
  });

  return <span className={classNames}>{children}</span>;
};

export default JDbadge;
