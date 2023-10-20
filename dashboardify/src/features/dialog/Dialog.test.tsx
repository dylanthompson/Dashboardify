import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dialog from './Dialog';

describe('<Dialog />', () => {
  test('it should mount', () => {
    render(<Dialog />);
    
    const dialog = screen.getByTestId('Dialog');

    expect(dialog).toBeInTheDocument();
  });
});