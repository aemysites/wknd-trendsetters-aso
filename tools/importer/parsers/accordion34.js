/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Get all immediate children that are accordions
  const accordionDivs = Array.from(element.querySelectorAll(':scope > div.accordion'));

  accordionDivs.forEach((accordion) => {
    // Title: find the .w-dropdown-toggle, then the .paragraph-lg inside it
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let title = '';
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        title = titleDiv;
      } else {
        // fallback: use toggle textContent
        title = document.createElement('span');
        title.textContent = toggle.textContent.trim();
      }
    }

    // Content: find nav.accordion-content .rich-text or the first .w-richtext inside
    let content = '';
    const nav = accordion.querySelector('nav.accordion-content');
    if (nav) {
      const richText = nav.querySelector('.w-richtext');
      if (richText) {
        content = richText;
      } else {
        // fallback: use nav innerHTML
        content = document.createElement('div');
        content.innerHTML = nav.innerHTML;
      }
    }

    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
