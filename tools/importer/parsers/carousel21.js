/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Carousel (carousel21)'];

  // Defensive: find the image and text content
  // The structure is: element > div > div.card > div.card-body > (div.h4-heading, img)
  let imageEl = null;
  let textContent = [];

  // Find the .card-body
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Find the image (mandatory)
    imageEl = cardBody.querySelector('img');
    // Find the heading (optional)
    const heading = cardBody.querySelector('.h4-heading');
    if (heading) {
      // Use an h2 for semantic heading
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      textContent.push(h2);
    }
    // If there are other text nodes or paragraphs, add them here (none in this example)
    // (No description or CTA in this HTML)
  }

  // Build the slide row: [image, text content]
  const slideRow = [imageEl, textContent.length ? textContent : ''];

  // Compose the table
  const tableRows = [headerRow, slideRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
