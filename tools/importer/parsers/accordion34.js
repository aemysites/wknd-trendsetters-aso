/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Defensive: Get all immediate accordion blocks
  const accordionBlocks = element.querySelectorAll(':scope > .accordion');

  accordionBlocks.forEach((accordion) => {
    // Title: Find the .paragraph-lg inside the toggle
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
    }
    // Defensive fallback: If not found, try to get first div inside toggle
    if (!titleEl && toggle) {
      titleEl = toggle.querySelector('div');
    }

    // Content: Find the .accordion-content (nav), then the rich text inside
    const contentNav = accordion.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Usually: utility-padding-all-1rem > .rich-text
      const padDiv = contentNav.querySelector('.utility-padding-all-1rem');
      if (padDiv) {
        contentEl = padDiv.querySelector('.rich-text');
      }
      // Defensive fallback: If not found, use padDiv itself
      if (!contentEl && padDiv) {
        contentEl = padDiv;
      }
      // Defensive fallback: If not found, use contentNav itself
      if (!contentEl) {
        contentEl = contentNav;
      }
    }

    // Push row: [title, content]
    rows.push([
      titleEl || '',
      contentEl || ''
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
