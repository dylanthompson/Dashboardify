import React, { lazy, Suspense } from 'react';

const LazyWeather = lazy(() => import('./Weather'));

const Weather = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyWeather {...props} />
  </Suspense>
);

export default Weather;
