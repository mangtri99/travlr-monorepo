import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from '../../src/components/badge';

describe('Badge component', () => {
  it('renders the correct color and text for available status', () => {
    const { getByText } = render(<Badge status="available" />);
    const badgeElement = getByText('available');
    expect(badgeElement).toHaveClass('bg-green-500');
  });

  it('renders the correct color and text for pending status', () => {
    const { getByText } = render(<Badge status="pending" />);
    const badgeElement = getByText('pending');
    expect(badgeElement).toHaveClass('bg-yellow-500');
  });

  it('renders the correct color and text for sold status', () => {
    const { getByText } = render(<Badge status="sold" />);
    const badgeElement = getByText('sold');
    expect(badgeElement).toHaveClass('bg-red-500');
  });
});
