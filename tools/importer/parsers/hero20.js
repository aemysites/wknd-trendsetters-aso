/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Hero (hero20)'];

  // --- Background Images ---
  // Find the grid of images for the background collage
  let backgroundImagesContainer = null;
  const gridContainers = element.querySelectorAll('.grid-layout');
  for (const grid of gridContainers) {
    // Look for the one with multiple .utility-position-relative children containing <img>
    const imgDivs = grid.querySelectorAll('.utility-position-relative img');
    if (imgDivs.length > 0) {
      backgroundImagesContainer = grid;
      break;
    }
  }

  // Defensive: If not found, fallback to any images inside element
  let backgroundImages = [];
  if (backgroundImagesContainer) {
    backgroundImages = Array.from(backgroundImagesContainer.querySelectorAll('img'));
  } else {
    backgroundImages = Array.from(element.querySelectorAll('img'));
  }

  // Wrap all images in a div for the background cell
  const bgDiv = document.createElement('div');
  backgroundImages.forEach(img => bgDiv.appendChild(img));

  // --- Content (Heading, Subheading, CTAs) ---
  // Find the content container
  let contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (!contentContainer) {
    // Fallback: look for .container or first h1
    contentContainer = element.querySelector('.container') || element.querySelector('h1')?.parentElement;
  }

  // Defensive: If not found, fallback to element itself
  if (!contentContainer) contentContainer = element;

  // Extract heading, subheading, and button group
  const heading = contentContainer.querySelector('h1');
  const subheading = contentContainer.querySelector('p');
  const buttonGroup = contentContainer.querySelector('.button-group');

  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (buttonGroup) contentCell.push(buttonGroup);

  // Table rows
  const rows = [
    headerRow,
    [bgDiv],
    [contentCell]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
