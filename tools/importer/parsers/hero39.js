/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero39)'];

  // --- ROW 2: Background Image ---
  let bgImg = '';
  const img = element.querySelector('img');
  if (img) bgImg = img;
  const bgImgRow = [bgImg];

  // --- ROW 3: Headline, Subheading, CTA ---
  // Find the main content container (the one with the text and button)
  let contentContainer = null;
  const containers = element.querySelectorAll('.container');
  if (containers.length) contentContainer = containers[0];

  // Collect all content blocks (headings, paragraphs, buttons)
  const contentCell = [];
  if (contentContainer) {
    // Get all headings, paragraphs, and CTA in order
    const selectors = 'h1, h2, h3, h4, h5, h6, p, a';
    const nodes = contentContainer.querySelectorAll(selectors);
    nodes.forEach((node) => {
      // Only add if has text content or is a link
      if (node.tagName === 'A' || node.textContent.trim()) {
        contentCell.push(node);
      }
    });
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
