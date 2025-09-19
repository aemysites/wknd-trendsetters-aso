/* global WebImporter */
export default function parse(element, { document }) {
  // Get top-level divs inside the section
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));

  // 1. Background image: first image in the first div
  let bgImg = null;
  if (topDivs.length > 0) {
    const bgImgDiv = topDivs[0];
    bgImg = bgImgDiv.querySelector('img');
  }

  // 2. Content: find the card body in the second div
  let cardBody = null;
  if (topDivs.length > 1) {
    const cardDiv = topDivs[1];
    cardBody = cardDiv.querySelector('.card-body');
  }

  // Extract all text and elements from cardBody for the content row
  let contentCell = '';
  if (cardBody) {
    // Create a fragment to hold all relevant content
    const frag = document.createDocumentFragment();
    // Heading
    const heading = cardBody.querySelector('h2');
    if (heading) frag.appendChild(heading.cloneNode(true));
    // All flex-vertical blocks (contains icon/text pairs)
    const flexVertical = cardBody.querySelector('.flex-vertical');
    if (flexVertical) {
      Array.from(flexVertical.children).forEach(child => {
        frag.appendChild(child.cloneNode(true));
      });
    }
    // Button group
    const buttonGroup = cardBody.querySelector('.button-group');
    if (buttonGroup) frag.appendChild(buttonGroup.cloneNode(true));
    // If fragment has content, use it
    if (frag.childNodes.length > 0) {
      contentCell = frag;
    }
  }

  // Table rows
  const headerRow = ['Hero (hero12)'];
  const bgImgRow = [bgImg ? bgImg : ''];
  const cells = [headerRow, bgImgRow];
  // Always add a third row, even if empty
  cells.push([contentCell && (contentCell.textContent?.trim() || contentCell.childNodes?.length) ? contentCell : '']);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
