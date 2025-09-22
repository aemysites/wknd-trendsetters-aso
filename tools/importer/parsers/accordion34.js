/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title cell: Find the .w-dropdown-toggle and get the .paragraph-lg inside it
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = toggle ? toggle.querySelector('.paragraph-lg') : null;
    // Defensive fallback: if not found, use the toggle itself
    if (!titleEl && toggle) titleEl = toggle;

    // Content cell: Find the .accordion-content (nav) and get its rich text
    const contentNav = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Get the first .rich-text inside contentNav
      contentEl = contentNav.querySelector('.rich-text');
      // Defensive fallback: use the inner wrapper if rich-text not found
      if (!contentEl) {
        const inner = contentNav.querySelector('div');
        if (inner) contentEl = inner;
        else contentEl = contentNav;
      }
    }

    // Add row: always 2 columns (title, content)
    rows.push([
      titleEl || '',
      contentEl || '',
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
