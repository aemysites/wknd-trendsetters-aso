/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Get all accordion items (direct children with class 'accordion')
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title cell: find the toggle div with the actual title
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleDiv = null;
    if (toggle) {
      // The title is usually in a child with class 'paragraph-lg'
      titleDiv = toggle.querySelector('.paragraph-lg');
    }
    // Defensive fallback: if not found, use the toggle itself
    const titleCell = titleDiv || toggle || document.createTextNode('');

    // Content cell: find the dropdown list content
    const contentNav = item.querySelector('.accordion-content');
    let contentCell = null;
    if (contentNav) {
      // Usually the content is inside a rich-text div
      const richText = contentNav.querySelector('.rich-text, .w-richtext');
      contentCell = richText || contentNav;
    } else {
      contentCell = document.createTextNode('');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
