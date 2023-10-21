import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ImagePicker from './ImagePicker';

describe('<ImagePicker />', () => {
  test('it should mount', () => {
    render(<ImagePicker setImage={undefined} />);
    
    const imagePicker = screen.getByTestId('ImagePicker');

    expect(imagePicker).toBeInTheDocument();
  });
});