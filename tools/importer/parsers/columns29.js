/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is a column cell)
  const columnDivs = element.querySelectorAll(':scope > div');

  // Prepare table rows
  const rows = [];
  // Header row: must match block name exactly
  rows.push(['Columns (columns29)']);

  // Second row: one cell per column, each with the referenced <img> element
  const contentRow = [];
  columnDivs.forEach((colDiv) => {
    // Find the first <img> in this column
    const img = colDiv.querySelector('img');
    if (img) {
      // Reference the existing image element (do not clone or create new)
      contentRow.push(img);
    } else {
      // If no image, include the column div's content (should not occur here, but for robustness)
      // Reference its children (text, etc.)
      if (colDiv.childNodes.length > 0) {
        const frag = document.createDocumentFragment();
        colDiv.childNodes.forEach((node) => frag.appendChild(node.cloneNode(true)));
        contentRow.push(frag);
      } else {
        contentRow.push(document.createTextNode(''));
      }
    }
  });
  rows.push(contentRow);

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
