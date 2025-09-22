/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the text content for the text cell
  function extractTextContent(cardContentDiv) {
    const fragments = [];
    // Tag and read time row
    const tagRow = cardContentDiv.querySelector('.flex-horizontal');
    if (tagRow) {
      // Tag
      const tag = tagRow.querySelector('.tag');
      if (tag) {
        fragments.push(tag.cloneNode(true));
      }
      // Read time
      const readTime = tagRow.querySelector('.paragraph-sm');
      if (readTime) {
        fragments.push(readTime.cloneNode(true));
      }
    }
    // Title (h3)
    const heading = cardContentDiv.querySelector('h3');
    if (heading) {
      fragments.push(heading.cloneNode(true));
    }
    // Description (p)
    const desc = cardContentDiv.querySelector('p');
    if (desc) {
      fragments.push(desc.cloneNode(true));
    }
    // CTA ("Read")
    // Find the last div inside cardContentDiv (should be the CTA)
    const divs = cardContentDiv.querySelectorAll(':scope > div');
    if (divs.length > 1) {
      const cta = divs[divs.length - 1];
      if (cta && cta.textContent.trim().toLowerCase() === 'read') {
        // Wrap CTA in a link if possible
        const parentLink = cardContentDiv.closest('a');
        if (parentLink && parentLink.href) {
          const ctaLink = document.createElement('a');
          ctaLink.href = parentLink.href;
          ctaLink.textContent = cta.textContent;
          fragments.push(ctaLink);
        } else {
          fragments.push(cta.cloneNode(true));
        }
      }
    }
    return fragments;
  }

  // Get all direct child <a> elements (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header
  const rows = [
    ['Cards (cards33)']
  ];

  // For each card, extract image and text content
  cards.forEach((card) => {
    // Find image (first img inside the card)
    const img = card.querySelector('img');
    // Find the text content container (the inner grid div)
    const gridDivs = card.querySelectorAll(':scope > div');
    let cardContentDiv = null;
    if (gridDivs.length > 0) {
      // The inner grid div contains the text and meta
      cardContentDiv = gridDivs[0];
    }
    // Defensive: fallback to card if no gridDiv
    const textContent = cardContentDiv ? extractTextContent(cardContentDiv) : [];
    rows.push([
      img ? img : '',
      textContent.length ? textContent : ''
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
