/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardEl) {
    // Find the image (mandatory)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Find the heading (h3 or h4)
    const heading = cardEl.querySelector('h3, h4');
    // Find the description (first <p>)
    const description = cardEl.querySelector('p');
    // Find the CTA (button or link inside the card)
    let cta = cardEl.querySelector('.button, .cta, a.button');
    // Defensive: If CTA is not a link, wrap in a span
    if (cta && cta.tagName !== 'A') {
      const span = document.createElement('span');
      span.append(cta);
      cta = span;
    }
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // Find the main grid containing the cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  // Get all direct card anchors in the main grid
  // There may be nested grids (see source HTML)
  let cardAnchors = Array.from(mainGrid.children).filter(
    (child) => child.tagName === 'A'
  );
  // Check for nested grid(s) and collect their anchors
  Array.from(mainGrid.children).forEach((child) => {
    if (child.classList.contains('w-layout-grid')) {
      cardAnchors.push(...Array.from(child.children).filter(
        (c) => c.tagName === 'A'
      ));
    }
  });

  // Compose table rows
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];
  cardAnchors.forEach((cardEl) => {
    const [img, textCell] = extractCardInfo(cardEl);
    // Defensive: Only add if image and text exist
    if (img && textCell.length) {
      // Fix: ensure only two columns per row
      rows.push([img, textCell]);
    }
  });

  // Fix: ensure all data rows have exactly two columns
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].length > 2) {
      rows[i] = [rows[i][0], rows[i].slice(1)];
    }
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
