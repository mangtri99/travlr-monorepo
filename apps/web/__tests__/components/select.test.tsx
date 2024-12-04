import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../../src/components/select';

describe('Select Component', () => {
  it('renders without crashing', () => {
    render(<Select options={[]} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('renders options correctly', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    render(<Select options={options} />);
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select options={[]} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    render(<Select options={[]} className={className} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass(className);
  });
});
