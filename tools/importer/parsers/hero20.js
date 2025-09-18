/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all images from the hero background collage
  function getHeroImages() {
    // The images are inside a grid-layout with desktop-3-column
    const grid = element.querySelector('.grid-layout.desktop-3-column');
    if (!grid) return [];
    // Get all img elements inside the grid
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper to get the hero text and CTA
  function getHeroContent() {
    // The hero content is inside .ix-hero-scale-3x-to-1x-content
    const contentWrapper = element.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!contentWrapper) return [];
    // The main container for text and buttons
    const container = contentWrapper.querySelector('.container');
    if (!container) return [];
    // Get heading, subheading, and button group
    const heading = container.querySelector('h1');
    const subheading = container.querySelector('p');
    const buttonGroup = container.querySelector('.button-group');
    // Compose content array
    const content = [];
    if (heading) content.push(heading);
    if (subheading) content.push(subheading);
    if (buttonGroup) content.push(buttonGroup);
    return content;
  }

  // Compose table rows
  const headerRow = ['Hero (hero20)'];

  // Second row: background collage images
  const heroImages = getHeroImages();
  const imagesRow = [heroImages]; // All images in one cell

  // Third row: hero text and CTA
  const heroContent = getHeroContent();
  const contentRow = [heroContent]; // All text and buttons in one cell

  // Create the table
  const cells = [
    headerRow,
    imagesRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
