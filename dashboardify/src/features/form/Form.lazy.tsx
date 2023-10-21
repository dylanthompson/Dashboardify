import React, { lazy, Suspense } from 'react';

const LazyForm = lazy(() => import('./Form'));

const Form = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyForm handleSubmit={undefined} handleViewChange={undefined} handleChange={undefined} formFields={[]} value={undefined} {...props} />
  </Suspense>
);

export default Form;
