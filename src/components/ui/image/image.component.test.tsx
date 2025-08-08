import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Image from './image.component';

describe('Image Component', () => {
  it('renders with required props', () => {
    render(<Image src="test.png" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.png');
    expect(img).toHaveAttribute('alt', 'Test image');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('tabIndex', '-1');
  });

  it('applies width, height, className, and style props', () => {
    render(
      <Image
        src="test.png"
        alt="Styled image"
        width={100}
        height={200}
        className="custom-class"
        style={{ border: '1px solid red' }}
      />
    );
    const img = screen.getByAltText('Styled image');
    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '200');
    expect(img.className).toContain('custom-class');
    expect(img).toHaveStyle('border: 1px solid red');
  });

  it('sets loading attribute to eager when specified', () => {
    render(<Image src="test.png" alt="Eager image" loading="eager" />);
    const img = screen.getByAltText('Eager image');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('sets role to presentation and empty alt for decorative images', () => {
    render(<Image src="test.png" alt="" />);
    const img = screen.getByRole('presentation');
    expect(img).toHaveAttribute('alt', '');
  });

  it('sets tabIndex to 0 when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<Image src="test.png" alt="Clickable image" onClick={handleClick} />);
    const img = screen.getByAltText('Clickable image');
    expect(img).toHaveAttribute('tabIndex', '0');
    fireEvent.click(img);
    expect(handleClick).toHaveBeenCalled();
  });
});