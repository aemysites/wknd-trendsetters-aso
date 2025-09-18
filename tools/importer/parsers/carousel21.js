/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the card body containing the content
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory)
  const img = cardBody.querySelector('img');
  // Defensive: Only proceed if an image is present
  if (!img) return;

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Prepare the text cell
  let textCell = '';
  if (heading) {
    // Use a semantic heading (h2) for the slide title
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell = h2;
  }

  // Table header as specified by the block name
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // Each slide: [image, textCell]
  rows.push([img, textCell]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
