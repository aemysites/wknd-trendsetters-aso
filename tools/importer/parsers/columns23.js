/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Columns (columns23)'];

  // Find all immediate child dividers (each is a Q&A pair)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: fallback if divider is not direct child (sometimes first is nested)
  if (dividers.length === 0) {
    // Try to find nested dividers (e.g., inside a flex or grid container)
    dividers.push(...element.querySelectorAll('.divider'));
  }

  // For each divider, extract the question and answer
  const rows = dividers.map(divider => {
    // Each divider contains a grid, which contains two children: heading and rich-text
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', ''];
    // Defensive: get first two children
    const [question, answer] = Array.from(grid.children);
    // If missing, fill with empty string
    return [question || '', answer || ''];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
