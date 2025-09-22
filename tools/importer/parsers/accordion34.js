/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all direct accordion blocks
  const accordionBlocks = Array.from(element.querySelectorAll(':scope > .accordion.w-dropdown'));

  // Table header row with required block name
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordionBlocks.forEach((accordion) => {
    // Title: Find the .w-dropdown-toggle > .paragraph-lg (or fallback to .w-dropdown-toggle)
    let titleCell = '';
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const label = toggle.querySelector('.paragraph-lg');
      titleCell = label || toggle;
    }

    // Content: Find .w-dropdown-list > .utility-padding-all-1rem > .rich-text (or fallback)
    let contentCell = '';
    const dropdownList = accordion.querySelector('.w-dropdown-list');
    if (dropdownList) {
      // Prefer .utility-padding-all-1rem > .rich-text, but fallback to .utility-padding-all-1rem, then dropdownList
      const paddingDiv = dropdownList.querySelector('.utility-padding-all-1rem');
      if (paddingDiv) {
        const richText = paddingDiv.querySelector('.rich-text');
        contentCell = richText || paddingDiv;
      } else {
        contentCell = dropdownList;
      }
    }

    rows.push([
      titleCell || '',
      contentCell || '',
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
