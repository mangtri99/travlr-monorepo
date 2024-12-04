import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../../src/components/input';

describe('Input component', () => {
  it('renders an input element with type text', () => {
    render(<Input id="test-input" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders the input with the provided className', () => {
    const className = 'custom-class';
    render(<Input id="test-input" className={className} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass(className);
  });

  it('renders the message when provided', () => {
    const message = 'This is an error message';
    render(<Input id="test-input" message={message} />);
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('text-red-500');
  });

  it('does not render the message when not provided', () => {
    render(<Input id="test-input" />);
    const messageElement = screen.queryByText(/This is an error message/i);
    expect(messageElement).not.toBeInTheDocument();
  });
});
