/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all images in the hero background
  function getBackgroundImages() {
    // Find the grid that contains the images
    const grid = element.querySelector('.desktop-3-column');
    if (!grid) return [];
    // Get all immediate child divs with images
    const imageDivs = Array.from(grid.querySelectorAll(':scope > div'));
    const images = imageDivs
      .map(div => div.querySelector('img'))
      .filter(img => img);
    return images;
  }

  // Helper to get the hero content (title, subheading, CTAs)
  function getHeroContent() {
    // Find the hero content container
    const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
    if (!contentContainer) return null;
    // Get heading, subheading, and buttons
    const heading = contentContainer.querySelector('h1');
    const subheading = contentContainer.querySelector('p');
    const buttonGroup = contentContainer.querySelector('.button-group');
    // Gather all CTAs (links)
    let ctas = [];
    if (buttonGroup) {
      ctas = Array.from(buttonGroup.querySelectorAll('a'));
    }
    // Compose content cell
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (subheading) cellContent.push(subheading);
    if (ctas.length) cellContent.push(...ctas);
    return cellContent.length ? cellContent : '';
  }

  // Compose table rows
  const headerRow = ['Hero (hero20)'];

  // Row 2: background images (all images in the collage)
  const backgroundImages = getBackgroundImages();
  const imagesRow = [backgroundImages.length ? backgroundImages : ''];

  // Row 3: hero content (heading, subheading, CTAs)
  const heroContent = getHeroContent();
  const contentRow = [heroContent ? heroContent : ''];

  // Build the table
  const cells = [headerRow, imagesRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
