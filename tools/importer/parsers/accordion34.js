/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child accordions
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Defensive fallback: find all .accordion inside if none found as direct children
  if (accordions.length === 0) {
    accordions.push(...element.querySelectorAll('.accordion'));
  }

  // Table header row as per block guidelines
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordions.forEach((acc) => {
    // Title: .w-dropdown-toggle > .paragraph-lg
    let titleCell = null;
    const toggle = acc.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        titleCell = titleDiv;
      } else {
        // fallback: use toggle's textContent
        titleCell = document.createElement('div');
        titleCell.textContent = toggle.textContent.trim();
      }
    } else {
      // fallback: use acc's textContent
      titleCell = document.createElement('div');
      titleCell.textContent = acc.textContent.trim();
    }

    // Content: .accordion-content or .w-dropdown-list, prefer .w-richtext inside
    let contentCell = null;
    const nav = acc.querySelector('.accordion-content, .w-dropdown-list');
    if (nav) {
      const rich = nav.querySelector('.w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        contentCell = nav;
      }
    } else {
      // fallback: empty div
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
