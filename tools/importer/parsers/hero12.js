/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children divs of the main section
  const sectionDivs = element.querySelectorAll(':scope > div > div');

  // Defensive: fallback if structure changes
  let bgImg = null;
  let contentDiv = null;

  // Find background image (first child div of grid-layout)
  if (sectionDivs.length > 0) {
    const bgDiv = sectionDivs[0];
    bgImg = bgDiv.querySelector('img.cover-image');
  }

  // Find content area (second child div of grid-layout)
  if (sectionDivs.length > 1) {
    contentDiv = sectionDivs[1];
  }

  // Defensive: if contentDiv is nested, find card-body
  let cardBody = contentDiv && contentDiv.querySelector('.card-body');

  // Find headline, subpoints, CTA
  let headline = null;
  let subpoints = [];
  let cta = null;

  if (cardBody) {
    // Headline
    headline = cardBody.querySelector('h2');

    // Subpoints (icon + text)
    const subpointRows = cardBody.querySelectorAll('.flex-horizontal.flex-gap-xxs');
    subpoints = Array.from(subpointRows).map(row => {
      // Each row: icon + p
      return row;
    });

    // CTA button
    cta = cardBody.querySelector('.button-group a.button');
  }

  // Compose content cell for row 3
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (subpoints.length) {
    // Add each subpoint row and divider after each except last
    subpoints.forEach((row, idx) => {
      contentCell.push(row);
      // Add divider after each except last
      const divider = cardBody.querySelectorAll('.divider')[idx];
      if (divider) contentCell.push(divider);
    });
  }
  if (cta) contentCell.push(cta);

  // Table rows
  const headerRow = ['Hero (hero12)'];
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [
    headerRow,
    bgRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
