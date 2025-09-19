/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  // Defensive: expect two children
  const imageCol = gridChildren[0];
  const textCol = gridChildren[1];

  // --- Row 1: Block name header ---
  const headerRow = ['Hero (hero14)'];

  // --- Row 2: Background image (optional) ---
  let imageCell = '';
  if (imageCol) {
    const img = imageCol.querySelector('img');
    if (img) imageCell = img;
  }

  // --- Row 3: Title, subheading, CTA ---
  // Only include actual content nodes (skip empty button group)
  let textNodes = [];
  if (textCol) {
    // Find h1 for title
    const h1 = textCol.querySelector('h1');
    if (h1) textNodes.push(h1);
    // Find button group (CTA)
    const buttonGroup = textCol.querySelector('.button-group');
    if (buttonGroup && buttonGroup.children.length > 0) {
      textNodes.push(buttonGroup);
    }
    // If no content found, fallback to all children
    if (textNodes.length === 0) {
      textNodes = Array.from(textCol.children).filter(node => node.textContent.trim() !== '');
    }
  }
  let textCell = '';
  if (textNodes.length === 1) {
    textCell = textNodes[0];
  } else if (textNodes.length > 1) {
    textCell = textNodes;
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imageCell],
    [textCell]
  ];
  
  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
