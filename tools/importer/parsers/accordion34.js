/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title cell: find the toggle, then the text
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      // The actual title is inside .paragraph-lg, but fallback to toggle if needed
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content cell: find the dropdown list, then the rich text
    const contentNav = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // The actual content is inside .rich-text or direct child
      const richText = contentNav.querySelector('.rich-text') || contentNav;
      contentEl = richText;
    }

    // Defensive: fallback to empty div if missing
    if (!titleEl) titleEl = document.createElement('div');
    if (!contentEl) contentEl = document.createElement('div');

    rows.push([titleEl, contentEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
