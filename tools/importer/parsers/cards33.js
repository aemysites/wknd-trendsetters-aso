/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <a> card element
  function extractCardInfo(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');

    // Find the card content container (the inner div after the image)
    const contentDiv = img.nextElementSibling;
    if (!contentDiv) return [img, document.createElement('div')]; // Defensive fallback

    // Tag and read time row
    const tagRow = contentDiv.querySelector('.flex-horizontal');

    // Tag (optional)
    let tagText = '';
    const tagDiv = tagRow && tagRow.querySelector('.tag');
    if (tagDiv) {
      const tagInner = tagDiv.querySelector('div');
      if (tagInner) tagText = tagInner.textContent.trim();
    }
    // Read time (optional)
    let readTime = '';
    const readTimeDiv = tagRow && tagRow.querySelector('.paragraph-sm');
    if (readTimeDiv) readTimeDiv.textContent && (readTime = readTimeDiv.textContent.trim());

    // Title (mandatory, h3)
    const titleEl = contentDiv.querySelector('h3');
    // Description (mandatory, p)
    const descEl = contentDiv.querySelector('p');
    // CTA (optional, last div)
    // Find the last div inside contentDiv that is not the tagRow
    let ctaEl = null;
    const divs = Array.from(contentDiv.querySelectorAll('div'));
    if (divs.length > 1) {
      ctaEl = divs[divs.length - 1];
      // Defensive: if ctaEl contains the tagRow, skip
      if (ctaEl === tagRow) ctaEl = null;
    }

    // Compose the text cell
    const textCell = document.createElement('div');
    // Tag and read time row (if present)
    if (tagText || readTime) {
      const tagWrap = document.createElement('div');
      tagWrap.style.display = 'flex';
      tagWrap.style.gap = '0.5em';
      if (tagText) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tagText;
        tagSpan.className = 'card-tag';
        tagWrap.appendChild(tagSpan);
      }
      if (readTime) {
        const readSpan = document.createElement('span');
        readSpan.textContent = readTime;
        readSpan.className = 'card-readtime';
        tagWrap.appendChild(readSpan);
      }
      textCell.appendChild(tagWrap);
    }
    // Title
    if (titleEl) {
      textCell.appendChild(titleEl);
    }
    // Description
    if (descEl) {
      textCell.appendChild(descEl);
    }
    // CTA (if present)
    if (ctaEl && ctaEl.textContent.trim().toLowerCase() === 'read') {
      // Wrap CTA in a link
      const link = document.createElement('a');
      link.textContent = ctaEl.textContent.trim();
      link.href = cardEl.href;
      link.className = 'card-cta';
      textCell.appendChild(link);
    }

    return [img, textCell];
  }

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards33)']);

  // Get all direct child <a> elements (each is a card)
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));
  cardEls.forEach(cardEl => {
    rows.push(extractCardInfo(cardEl));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
