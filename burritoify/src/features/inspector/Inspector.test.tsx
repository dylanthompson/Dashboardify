import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Inspector from './Inspector';

describe('<Inspector />', () => {
  test('it should mount', () => {
    render(<Inspector />);
    
    const inspector = screen.getByTestId('Inspector');

    expect(inspector).toBeInTheDocument();
  });
});