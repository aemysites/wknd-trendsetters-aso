/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get the background image (if present)
  function getBackgroundImageEl() {
    // Look for an img inside .ix-parallax-scale-out-hero
    const grid = element.querySelector('.w-layout-grid');
    if (!grid) return null;
    const bgCol = grid.children[0]; // usually the first column
    if (!bgCol) return null;
    const parallax = bgCol.querySelector('.ix-parallax-scale-out-hero');
    if (!parallax) return null;
    const img = parallax.querySelector('img');
    return img || null;
  }

  // Helper: get the main heading and possible CTA
  function getContentEl() {
    // Look for h1 and button/link in the second column
    const grid = element.querySelector('.w-layout-grid');
    if (!grid) return null;
    const contentCol = grid.children[1]; // usually the second column
    if (!contentCol) return null;
    // We'll collect heading, subheading, and CTA if present
    // For this example, only h1 is present
    const contentParts = [];
    const h1 = contentCol.querySelector('h1');
    if (h1) contentParts.push(h1);
    // Subheading (h2/h3/p) and CTA (a/button) could be added here if present
    // For now, check for a button or link
    const btnGroup = contentCol.querySelector('.button-group');
    if (btnGroup && btnGroup.children.length > 0) {
      // Add all buttons/links
      contentParts.push(...btnGroup.children);
    }
    // Defensive: if nothing found, fallback to all content
    if (contentParts.length === 0) {
      contentParts.push(...contentCol.childNodes);
    }
    // Wrap in a div for structure
    const wrapper = document.createElement('div');
    contentParts.forEach((el) => wrapper.append(el));
    return wrapper;
  }

  // Build table rows
  const headerRow = ['Hero (hero14)'];
  const bgImg = getBackgroundImageEl();
  const contentEl = getContentEl();
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentEl ? contentEl : ''],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
