/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the two main grid sections
  const grids = container.querySelectorAll('.w-layout-grid');
  if (grids.length < 2) return;

  // First grid: header/content columns
  const headerGrid = grids[0];
  const headerCols = Array.from(headerGrid.children).filter(el => el.tagName === 'DIV');
  if (headerCols.length < 2) return;
  const leftCol = headerCols[0].cloneNode(true);
  const rightCol = headerCols[1].cloneNode(true);

  // Second grid: images
  const imagesGrid = grids[1];
  const imageDivs = Array.from(imagesGrid.children).filter(el => el.tagName === 'DIV');
  if (imageDivs.length < 2) return;
  const imgCell1 = imageDivs[0].cloneNode(true);
  const imgCell2 = imageDivs[1].cloneNode(true);

  // Build table rows
  const headerRow = ['Columns (columns16)'];
  const secondRow = [leftCol, rightCol];
  const thirdRow = [imgCell1, imgCell2];
  const tableRows = [headerRow, secondRow, thirdRow];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  if (table) element.replaceWith(table);
}
