/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children DIVs of the section
  const sectionDivs = element.querySelectorAll(':scope > div');

  // Find background image (first child div with img)
  let backgroundImg = null;
  if (sectionDivs.length > 0) {
    const bgImgDiv = sectionDivs[0];
    backgroundImg = bgImgDiv.querySelector('img');
  }

  // Find content area (second child div)
  let contentArea = null;
  if (sectionDivs.length > 1) {
    contentArea = sectionDivs[1];
  }

  // In content area, find the card body
  let cardBody = null;
  if (contentArea) {
    cardBody = contentArea.querySelector('.card-body');
  }

  // In card body, find the grid-layout (contains left image and right text/button)
  let gridLayout = null;
  if (cardBody) {
    gridLayout = cardBody.querySelector('.grid-layout');
  }

  // Defensive: Find left-side image (concert crowd)
  let leftImg = null;
  if (gridLayout) {
    leftImg = gridLayout.querySelector('img');
  }

  // Find right-side text content (h2, paragraphs, button)
  let rightContent = null;
  if (gridLayout) {
    // The right content is the div after the left image
    const gridChildren = Array.from(gridLayout.children);
    rightContent = gridChildren.find(
      (el) => el !== leftImg && el.tagName === 'DIV'
    );
  }

  // Compose the content cell for row 3
  let contentCellElements = [];
  if (rightContent) {
    // Heading
    const heading = rightContent.querySelector('h2');
    if (heading) contentCellElements.push(heading.cloneNode(true));

    // Subpoints (icon + paragraph)
    const verticalFlex = rightContent.querySelector('.flex-vertical');
    if (verticalFlex) {
      // Each flex-horizontal is a row with icon and paragraph
      const subRows = verticalFlex.querySelectorAll('.flex-horizontal');
      subRows.forEach((row) => {
        // Instead of just cloning, extract all text content in each row
        const texts = [];
        row.childNodes.forEach((node) => {
          if (node.nodeType === 1 && node.tagName === 'P') {
            texts.push(node.textContent.trim());
          }
        });
        if (texts.length) {
          contentCellElements.push(texts.join(' '));
        }
      });
    }

    // Button
    const buttonGroup = rightContent.querySelector('.button-group');
    if (buttonGroup) {
      // Find the link/button inside
      const btn = buttonGroup.querySelector('a');
      if (btn) contentCellElements.push(btn.cloneNode(true));
    }
  }

  // Always create a 3-row table: header, background, content (third row only if content)
  const headerRow = ['Hero (hero12)'];
  const backgroundRow = [backgroundImg ? backgroundImg.cloneNode(true) : ''];
  const cells = [headerRow, backgroundRow];
  if (contentCellElements.length) {
    cells.push([contentCellElements]);
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
