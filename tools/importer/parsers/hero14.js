/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  let gridDiv = element.querySelector('.w-layout-grid');
  if (!gridDiv) gridDiv = element;

  // Find the image (background)
  let img = gridDiv.querySelector('img');

  // Find the text container
  let textDiv = null;
  const gridChildren = gridDiv.querySelectorAll(':scope > div');
  if (gridChildren.length > 1) {
    textDiv = gridChildren[1];
  } else {
    textDiv = gridDiv.querySelector('.container');
  }

  // Find heading (h1)
  let heading = textDiv ? textDiv.querySelector('h1') : null;

  // Find subheading (h2/h3/p) and CTA (button-group)
  let subheading = null;
  let cta = null;
  if (textDiv) {
    const buttonGroup = textDiv.querySelector('.button-group');
    if (buttonGroup && buttonGroup.children.length > 0) {
      cta = buttonGroup;
    }
    // Try to find a subheading (h2, h3, p) below h1
    if (heading) {
      let sib = heading.nextElementSibling;
      while (sib) {
        if (!subheading && (sib.tagName === 'H2' || sib.tagName === 'H3' || sib.tagName === 'P')) {
          subheading = sib;
        }
        sib = sib.nextElementSibling;
      }
    }
  }

  // Compose text cell
  const textCellContent = [];
  if (heading) textCellContent.push(heading);
  if (subheading) textCellContent.push(subheading);
  if (cta) textCellContent.push(cta);

  // Table rows
  const headerRow = ['Hero (hero14)'];
  const imageRow = [img ? img : ''];
  const textRow = [textCellContent.length ? textCellContent : ''];
  const cells = [headerRow, imageRow, textRow];

  // Create table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
