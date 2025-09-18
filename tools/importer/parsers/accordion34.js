/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Get all immediate accordion items (w-dropdown)
  const accordions = element.querySelectorAll(':scope > .accordion.w-dropdown');

  accordions.forEach((accordion) => {
    // Title cell: find the .paragraph-lg inside the toggle
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      const title = toggle.querySelector('.paragraph-lg');
      if (title) titleCell = title;
    }

    // Content cell: find the .accordion-content (nav), then .w-richtext inside
    let contentCell = '';
    const contentNav = accordion.querySelector('.accordion-content');
    if (contentNav) {
      // Defensive: get all children except dropdown icon
      // Grab the .w-richtext (which contains the actual content)
      const richText = contentNav.querySelector('.w-richtext');
      if (richText) contentCell = richText;
      else {
        // fallback: use the inner content
        contentCell = contentNav;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
