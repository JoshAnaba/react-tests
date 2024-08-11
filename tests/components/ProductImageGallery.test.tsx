
import { render, screen} from '@testing-library/react'
import ProductImageGallery from '../../src/components/ProductImageGallery'

describe('ProductImageGallery', () => {
  it("should render nothing if no image urls", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
   expect(container).toBeEmptyDOMElement();
  });

  it("should render a list of image urls", () => {
    const imageUrls:string[] = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ];
    render(<ProductImageGallery imageUrls={imageUrls} />);
   screen.getAllByRole('img').forEach((img, i) => {
     expect(img).toBeInTheDocument();
     expect(img).toHaveAttribute('src', imageUrls[i]);
   }); 
  });
});