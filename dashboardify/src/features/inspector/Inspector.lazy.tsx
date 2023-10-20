import React, { lazy, Suspense } from 'react';

const LazyInspector = lazy(() => import('./Inspector'));

const Inspector = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInspector {...props} />
  </Suspense>
);

export default Inspector;
