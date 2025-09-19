/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each grid child
  function extractCardContent(cardDiv) {
    // Find the first image inside the card
    const img = cardDiv.querySelector('img');
    // Find the heading and description (if present)
    let heading = null;
    let description = null;
    // Find the content container
    const contentContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (contentContainer) {
      heading = contentContainer.querySelector('h3');
      description = contentContainer.querySelector('p');
    }
    // If no heading/description, try to find them directly
    if (!heading) heading = cardDiv.querySelector('h3');
    if (!description) description = cardDiv.querySelector('p');
    // Compose the text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (description) textCell.appendChild(description);
    return [img, textCell];
  }

  // Get all immediate children of the grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // For each card div, extract image and text content
  cardDivs.forEach((cardDiv) => {
    // Defensive: Only process if there's an image
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip non-card items
    const [imageEl, textEl] = extractCardContent(cardDiv);
    rows.push([imageEl, textEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
