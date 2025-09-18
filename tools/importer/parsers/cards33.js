/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each anchor
  function extractCardContent(cardEl) {
    // Find the image (first child of the inner grid)
    const innerGrid = cardEl.querySelector(':scope > div');
    const img = innerGrid.querySelector('img');

    // Find the text content block (second child of inner grid)
    // It contains: tag, read time, heading, paragraph, CTA
    const textBlock = innerGrid.querySelector(':scope > div');
    if (!img || !textBlock) return null;

    // Extract tag and read time (optional)
    const tagRow = textBlock.querySelector('.flex-horizontal');
    let tagFragment = null;
    if (tagRow) {
      tagFragment = document.createElement('div');
      tagFragment.append(...tagRow.childNodes);
    }

    // Heading
    const heading = textBlock.querySelector('h3, .h4-heading');
    // Description paragraph
    const desc = textBlock.querySelector('p');
    // CTA ("Read")
    // Find the last child div inside textBlock
    let cta = null;
    const divs = textBlock.querySelectorAll(':scope > div');
    if (divs.length > 1) {
      cta = divs[divs.length - 1];
    }

    // Compose the text cell
    const textCell = document.createElement('div');
    if (tagFragment) textCell.appendChild(tagFragment);
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);

    return [img, textCell];
  }

  // Get all cards (direct children that are anchors)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Build rows for each card
  cards.forEach(cardEl => {
    const cardContent = extractCardContent(cardEl);
    if (cardContent) {
      rows.push(cardContent);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
