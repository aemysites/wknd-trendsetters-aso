/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all images from the hero background grid
  function getHeroImages(el) {
    // Find the grid containing images
    const grid = el.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
    if (!grid) return [];
    // Get all img elements directly under grid
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper to get the hero content (title, subheading, CTA)
  function getHeroContent(el) {
    // Find the content container
    const content = el.querySelector('.ix-hero-scale-3x-to-1x-content .container');
    if (!content) return [];
    // Get heading, subheading, and button group
    const heading = content.querySelector('h1');
    const subheading = content.querySelector('p');
    const buttonGroup = content.querySelector('.button-group');
    // Compose content array
    const contentArr = [];
    if (heading) contentArr.push(heading);
    if (subheading) contentArr.push(subheading);
    if (buttonGroup) contentArr.push(buttonGroup);
    return contentArr;
  }

  // Table rows
  const headerRow = ['Hero (hero20)'];

  // Row 2: background images (all images in the hero grid)
  const images = getHeroImages(element);
  // Place all images in one cell as an array
  const imageRow = [images.length ? images : ''];

  // Row 3: hero content (heading, subheading, CTA)
  const heroContent = getHeroContent(element);
  const contentRow = [heroContent.length ? heroContent : ''];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
