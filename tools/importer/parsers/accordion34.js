/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all immediate accordion blocks
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));
  
  // Table header row
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordions.forEach((acc) => {
    // Title: find the direct child with class 'w-dropdown-toggle', then the '.paragraph-lg' inside
    let titleEl = acc.querySelector('.w-dropdown-toggle .paragraph-lg');
    // Defensive: fallback to first .w-dropdown-toggle if .paragraph-lg not found
    if (!titleEl) {
      const toggle = acc.querySelector('.w-dropdown-toggle');
      titleEl = toggle ? toggle : document.createTextNode('');
    }

    // Content: find the nav.accordion-content, then the .rich-text inside
    let contentEl = acc.querySelector('nav.accordion-content .rich-text');
    // Defensive: fallback to nav.accordion-content if .rich-text not found
    if (!contentEl) {
      contentEl = acc.querySelector('nav.accordion-content') || document.createTextNode('');
    }

    rows.push([titleEl, contentEl]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
