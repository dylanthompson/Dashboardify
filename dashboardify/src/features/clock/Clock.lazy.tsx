import React, { lazy, Suspense } from 'react';

const LazyClock = lazy(() => import('./Clock'));

const Clock = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyClock i={''} showSeconds={false} {...props} />
  </Suspense>
);

export default Clock;
