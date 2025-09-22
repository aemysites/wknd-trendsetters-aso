/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Defensive: Get all immediate accordion blocks
  const accordionDivs = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionDivs.forEach((accordion) => {
    // Title cell: Find the .w-dropdown-toggle and get the text (usually in .paragraph-lg)
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      // Get all children except the icon
      const titleEl = toggle.querySelector('.paragraph-lg');
      if (titleEl) {
        titleCell = titleEl;
      } else {
        // Fallback: get all text content except icon
        const icon = toggle.querySelector('.dropdown-icon');
        if (icon) icon.remove();
        titleCell = toggle;
      }
    }

    // Content cell: Find the .accordion-content (nav), get its content
    const contentNav = accordion.querySelector('.accordion-content');
    let contentCell = '';
    if (contentNav) {
      // The actual content is inside the nav, in a div.rich-text usually
      const richText = contentNav.querySelector('.rich-text');
      if (richText) {
        contentCell = richText;
      } else {
        // Fallback: use all content inside nav
        contentCell = contentNav;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
