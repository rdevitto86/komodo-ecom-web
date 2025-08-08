import { render, screen, fireEvent } from '@testing-library/react';
import BaseButton from './button.component';

describe('BaseButton Component', () => {
  it('renders a button with text', () => {
    render(<BaseButton text="Click Me" />);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders a button with an icon and text', () => {
    render(
      <BaseButton
        text="Save"
        icon={<img src="/save-icon.svg" alt="Save Icon" />}
      />
    );
    const button = screen.getByText('Save');
    const icon = screen.getByAltText('Save Icon');
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('renders a link when href is provided', () => {
    render(<BaseButton href="/about" text="Learn More" />);
    const link = screen.getByText('Learn More');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders a link with an icon and text', () => {
    render(
      <BaseButton
        href="/about"
        text="Learn More"
        icon={<img src="/info-icon.svg" alt="Info Icon" />}
      />
    );
    const link = screen.getByText('Learn More');
    const icon = screen.getByAltText('Info Icon');
    expect(link).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('applies size and variant classes', () => {
    render(<BaseButton text="Click Me" size="large" variant="secondary" />);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('large');
    expect(button).toHaveClass('secondary');
  });

  it('applies custom className and style', () => {
    render(
      <BaseButton
        text="Custom"
        className="my-custom-class"
        style={{ backgroundColor: 'purple' }}
      />
    );
    const button = screen.getByText('Custom');
    expect(button).toHaveClass('my-custom-class');
    expect(button).toHaveStyle('background-color: purple');
  });

  it('handles onClick events', () => {
    const handleClick = vi.fn();
    render(<BaseButton text="Click Me" onClick={handleClick} />);
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders a disabled button', () => {
    render(<BaseButton text="Disabled" disabled />);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });

  it('renders a disabled link with aria-disabled', () => {
    render(<BaseButton href="/about" text="Disabled Link" disabled />);
    const link = screen.getByText('Disabled Link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders children instead of text when provided', () => {
    render(
      <BaseButton>
        <span>Custom Content</span>
      </BaseButton>
    );
    const customContent = screen.getByText('Custom Content');
    expect(customContent).toBeInTheDocument();
  });
});
