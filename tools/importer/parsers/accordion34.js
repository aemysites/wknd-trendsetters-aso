/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Defensive: Get all immediate accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title cell: find the .w-dropdown-toggle and its .paragraph-lg child
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content cell: find the .accordion-content and its rich text
    const contentNav = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Look for .rich-text or just use the content wrapper
      contentEl = contentNav.querySelector('.rich-text') || contentNav;
    }

    // Push row with 2 columns: [title, content]
    rows.push([
      titleEl || '',
      contentEl || ''
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
