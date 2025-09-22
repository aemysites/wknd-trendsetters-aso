/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from anchor element
  function extractCardInfo(cardEl) {
    // Find the image (first child div with img)
    const imgDiv = cardEl.querySelector(':scope > div');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Find the tag/date row (second child div)
    const tagRow = cardEl.querySelectorAll(':scope > div')[1];
    let tag = '', date = '';
    if (tagRow) {
      const tagEl = tagRow.querySelector('.tag');
      if (tagEl) tag = tagEl.textContent;
      const dateEl = tagRow.querySelector('.paragraph-sm');
      if (dateEl) date = dateEl.textContent;
    }
    // Find the title (h3)
    const titleEl = cardEl.querySelector('h3');

    // Compose text content cell
    const textContent = document.createElement('div');
    textContent.style.display = 'flex';
    textContent.style.flexDirection = 'column';
    textContent.style.gap = '0.25em';

    // Add tag/date row if present
    if (tag || date) {
      const metaDiv = document.createElement('div');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.style.fontWeight = 'bold';
        metaDiv.appendChild(tagSpan);
      }
      if (date) {
        if (tag) metaDiv.appendChild(document.createTextNode(' '));
        const dateSpan = document.createElement('span');
        dateSpan.textContent = date;
        dateSpan.style.opacity = '0.7';
        metaDiv.appendChild(dateSpan);
      }
      textContent.appendChild(metaDiv);
    }
    // Add title (as heading)
    if (titleEl) {
      textContent.appendChild(titleEl.cloneNode(true));
    }
    // There is no description in the source html, so nothing else to add
    // Add CTA link (the card itself)
    const link = document.createElement('a');
    link.href = cardEl.href;
    link.textContent = 'Read more';
    textContent.appendChild(link);
    // First cell: image, second cell: text content
    return [img ? img.cloneNode(true) : '', textContent];
  }

  // Get all card anchor elements
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];
  cardEls.forEach(cardEl => {
    rows.push(extractCardInfo(cardEl));
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
