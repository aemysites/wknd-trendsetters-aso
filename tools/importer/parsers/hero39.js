/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of a node
  function getDirectChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag);
  }

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  // Find the prominent image (background)
  let bgImg = null;
  // The image is inside the first grid-layout div
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  // Defensive: If not found, try fallback
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row
  // Find headline, paragraph, and button
  let title = null, subheading = null, cta = null;
  // The second grid-layout div contains the text and CTA
  let contentDiv = null;
  for (const div of gridDivs) {
    if (div.querySelector('h1')) {
      contentDiv = div;
      break;
    }
  }
  if (contentDiv) {
    // Headline
    title = contentDiv.querySelector('h1');
    // Paragraph (subheading)
    subheading = contentDiv.querySelector('p');
    // CTA (button link)
    cta = contentDiv.querySelector('a');
  }
  // Compose content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
