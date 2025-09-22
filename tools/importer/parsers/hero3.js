/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by tag/class
  const getDirectChild = (parent, selector) => {
    return Array.from(parent.children).find((el) => el.matches(selector));
  };

  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row
  // Find the main image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: fallback to any img in the block
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: Title, Subheading, CTA
  // Find the card div (contains h1, p, and button group)
  let cardDiv = null;
  for (const div of element.querySelectorAll('div')) {
    if (
      div.classList.contains('card') &&
      div.querySelector('h1')
    ) {
      cardDiv = div;
      break;
    }
  }

  // Defensive: fallback to any h1-containing div
  if (!cardDiv) {
    cardDiv = Array.from(element.querySelectorAll('div')).find((d) => d.querySelector('h1'));
  }

  // Compose content cell
  const contentCell = [];
  if (cardDiv) {
    // Heading
    const h1 = cardDiv.querySelector('h1');
    if (h1) contentCell.push(h1);
    // Subheading (p)
    const sub = cardDiv.querySelector('p');
    if (sub) contentCell.push(sub);
    // CTA(s)
    const btnGroup = cardDiv.querySelector('.button-group');
    if (btnGroup) {
      // Clone to avoid moving original nodes if needed
      contentCell.push(btnGroup);
    }
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const rows = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
