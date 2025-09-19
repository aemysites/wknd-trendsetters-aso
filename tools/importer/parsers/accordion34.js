/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate accordion blocks
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // For each accordion block, extract title and content
  accordions.forEach((accordion) => {
    // Title: Find the toggle, then the text container inside
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      // Find the title text (usually .paragraph-lg)
      title = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: Find the dropdown list, then the rich text inside
    const dropdown = accordion.querySelector('.w-dropdown-list');
    let content = null;
    if (dropdown) {
      // Find the rich text container
      content = dropdown.querySelector('.rich-text') || dropdown;
    }

    // Defensive: fallback to whole toggle or dropdown if not found
    rows.push([
      title || document.createTextNode(''),
      content || document.createTextNode(''),
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
