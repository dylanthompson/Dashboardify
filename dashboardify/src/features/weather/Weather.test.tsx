import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Weather from './Weather';

describe('<Weather />', () => {
  test('it should mount', () => {
    render(<Weather location={''} />);
    const weather = screen.getByTestId('Weather');
    expect(weather).toBeInTheDocument();
  });
});