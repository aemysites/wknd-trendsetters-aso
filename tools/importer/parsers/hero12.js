/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children divs
  const topDivs = element.querySelectorAll(':scope > div');

  // 1. Extract background image (first image in first div)
  let backgroundImg = null;
  if (topDivs.length > 0) {
    const bgImgCandidate = topDivs[0].querySelector('img');
    if (bgImgCandidate) backgroundImg = bgImgCandidate;
  }

  // 2. Extract all text content from the second main div (card)
  let contentCell = [];
  if (topDivs.length > 1) {
    const cardDiv = topDivs[1];
    // Collect all relevant content in visual order
    // Headings
    const headings = cardDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentCell.push(h));
    // Paragraphs (including feature list items)
    const paragraphs = cardDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (!contentCell.includes(p)) contentCell.push(p);
    });
    // Buttons/links
    const buttons = cardDiv.querySelectorAll('a.button, .button-group a');
    buttons.forEach(b => {
      if (!contentCell.includes(b)) contentCell.push(b);
    });
  }

  // Compose table rows
  const headerRow = ['Hero (hero12)'];
  const backgroundRow = [backgroundImg ? backgroundImg : ''];
  // Only add the third row if there is content
  const rows = [
    headerRow,
    backgroundRow
  ];
  if (contentCell.length > 0) {
    rows.push([contentCell]);
  }

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
