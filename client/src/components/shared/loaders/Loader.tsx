'use client';

import React from 'react';

import { useTheme } from 'next-themes';
import * as loaders from 'react-spinners';

type LoaderType = keyof typeof loaders;

type LoaderPropsMap = {
  [K in LoaderType]: { type: K } & Omit<
    React.ComponentProps<(typeof loaders)[K]>,
    'color'
  >;
};

type LoaderProps = LoaderPropsMap[LoaderType];

const Loader: React.FC<LoaderProps> = (props) => {
  const { type, ...rest } = props;
  const { theme } = useTheme();

  const SelectedLoader = loaders[type];

  if (!SelectedLoader) {
    console.error(`Loader type "${type}" not found in react-spinners.`);
    return null;
  }

  return (
    <SelectedLoader
      color={theme === 'dark' ? '#ffffff' : '#000000'}
      {...rest}
    />
  );
};

export default Loader;
