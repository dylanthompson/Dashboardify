import React, { lazy, Suspense } from 'react';

const LazyDialog = lazy(() => import('./Dialog'));

const Dialog = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDialog {...props} />
  </Suspense>
);

export default Dialog;
