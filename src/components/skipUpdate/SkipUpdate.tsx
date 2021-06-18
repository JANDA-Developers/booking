import React from "react";

interface IProp {
  skip: boolean;
  children: any;
}

export const _SkipUpdate: React.FC<IProp> = ({ children }) => {
  return children;
};

export const SkipUpdate = React.memo(_SkipUpdate, ({}, { skip }) => skip);
