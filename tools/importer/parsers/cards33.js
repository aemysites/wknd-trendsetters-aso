/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract text content from a card
  function extractCardText(cardContentDiv) {
    const fragments = [];
    // Tag and read time (optional)
    const tagRow = cardContentDiv.querySelector('.flex-horizontal');
    if (tagRow) {
      // Tag
      const tag = tagRow.querySelector('.tag');
      if (tag) {
        fragments.push(tag.textContent.trim());
      }
      // Read time
      const readTime = tagRow.querySelector('.paragraph-sm');
      if (readTime) {
        fragments.push(readTime.textContent.trim());
      }
    }
    // Title (h3)
    const title = cardContentDiv.querySelector('h3');
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title.textContent.trim();
      fragments.push(h);
    }
    // Description (p)
    const desc = cardContentDiv.querySelector('p');
    if (desc) {
      fragments.push(desc);
    }
    // CTA ("Read")
    // Find a direct child div with text 'Read'
    const ctaDivs = Array.from(cardContentDiv.querySelectorAll('div'));
    const ctaDiv = ctaDivs.find(div => div.textContent.trim().toLowerCase() === 'read');
    if (ctaDiv) {
      // If the card is wrapped in a link, use its href
      let linkHref = null;
      let parent = cardContentDiv.parentElement;
      while (parent && parent !== element) {
        if (parent.tagName === 'A' && parent.href) {
          linkHref = parent.getAttribute('href');
          break;
        }
        parent = parent.parentElement;
      }
      if (linkHref) {
        const link = document.createElement('a');
        link.href = linkHref;
        link.textContent = ctaDiv.textContent.trim();
        fragments.push(link);
      } else {
        fragments.push(ctaDiv);
      }
    }
    return fragments;
  }

  // Get all cards (direct children that are <a> elements)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards33)']);

  // Each card
  cards.forEach(card => {
    // Find image (first img inside card)
    const img = card.querySelector('img');
    // Find card content (the div after the image)
    const cardContentDiv = img ? img.nextElementSibling : null;
    if (img && cardContentDiv) {
      // Compose text cell
      const textCell = extractCardText(cardContentDiv);
      rows.push([img, textCell]);
    }
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
