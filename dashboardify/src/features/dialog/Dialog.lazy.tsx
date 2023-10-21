import React, { lazy, Suspense } from 'react';

const LazyDialog = lazy(() => import('./Dialog'));

const Dialog = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDialog open={false} onClose={function (value: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />
  </Suspense>
);

export default Dialog;
