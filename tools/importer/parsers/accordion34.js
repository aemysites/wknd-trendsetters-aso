/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as required
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Get all direct children that are accordions
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordions.forEach((accordion) => {
    // Title cell: find the .w-dropdown-toggle > .paragraph-lg (the label)
    let title = '';
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        title = titleDiv;
      }
    }

    // Content cell: find the .accordion-content, then its .rich-text or all its content
    let content = '';
    const contentNav = accordion.querySelector('.accordion-content');
    if (contentNav) {
      // There may be a .rich-text inside a padding wrapper
      const richText = contentNav.querySelector('.rich-text');
      if (richText) {
        content = richText;
      } else {
        // fallback: use all children of contentNav
        content = Array.from(contentNav.children);
      }
    }

    // Defensive: only add if both title and content exist
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
