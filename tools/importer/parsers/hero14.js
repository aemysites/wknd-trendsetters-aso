/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get first matching descendant by selector
  function getDescendant(parent, selector) {
    return parent.querySelector(selector);
  }

  // 1. Header row: block name
  const headerRow = ['Hero (hero14)'];

  // 2. Background image row
  // Find the image inside the .ix-parallax-scale-out-hero div
  let bgImg = null;
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    bgImg = parallaxDiv.querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  // Find the container with the heading and possible CTA
  let contentCell = [];
  // The heading is inside .container .utility-margin-bottom-6rem > h1
  const container = element.querySelector('.container');
  if (container) {
    const headingWrapper = container.querySelector('.utility-margin-bottom-6rem');
    if (headingWrapper) {
      // Heading
      const h1 = headingWrapper.querySelector('h1');
      if (h1) contentCell.push(h1);
      // Button group (CTA), if present
      const buttonGroup = headingWrapper.querySelector('.button-group');
      if (buttonGroup && buttonGroup.children.length > 0) {
        contentCell.push(buttonGroup);
      }
    }
  }
  // Defensive: if nothing found, leave cell empty
  const contentRow = [contentCell.length > 0 ? contentCell : ''];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
