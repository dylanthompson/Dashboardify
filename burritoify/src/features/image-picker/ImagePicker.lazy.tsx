import React, { lazy, Suspense } from 'react';

const LazyImagePicker = lazy(() => import('./ImagePicker'));

const ImagePicker = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyImagePicker {...props} />
  </Suspense>
);

export default ImagePicker;
