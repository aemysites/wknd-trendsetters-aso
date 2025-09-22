/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct accordion items
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header as required
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordions.forEach((accordion) => {
    // Title cell: find the w-dropdown-toggle, then the .paragraph-lg inside
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content cell: find the nav.accordion-content, then the .rich-text inside
    let contentEl = null;
    const nav = accordion.querySelector('nav.accordion-content');
    if (nav) {
      // Try to find the rich text content
      const rich = nav.querySelector('.rich-text');
      if (rich) {
        contentEl = rich;
      } else {
        // fallback: use the nav's content
        contentEl = nav;
      }
    }

    // Defensive: fallback to empty divs if not found
    if (!titleEl) titleEl = document.createElement('div');
    if (!contentEl) contentEl = document.createElement('div');

    rows.push([titleEl, contentEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
