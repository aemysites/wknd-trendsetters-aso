/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach(card => {
    // --- First cell: Image ---
    // Find the image inside the card
    const img = card.querySelector('img');
    const imgCell = img ? img : '';

    // --- Second cell: Text content ---
    // Get tag and date
    let tag = '', date = '';
    const metaRow = card.querySelector('.flex-horizontal');
    if (metaRow) {
      const tagEl = metaRow.querySelector('.tag');
      const dateEl = metaRow.querySelector('.paragraph-sm');
      tag = tagEl ? tagEl.textContent.trim() : '';
      date = dateEl ? dateEl.textContent.trim() : '';
    }
    // Get title
    const titleEl = card.querySelector('h3');
    const title = titleEl ? titleEl.textContent.trim() : '';

    // Compose text cell: meta (tag/date), title (heading)
    const textCellDiv = document.createElement('div');
    // meta row
    if (tag || date) {
      const metaDiv = document.createElement('div');
      metaDiv.style.display = 'flex';
      metaDiv.style.gap = '0.5em';
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.style.fontWeight = 'bold';
        metaDiv.appendChild(tagSpan);
      }
      if (date) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = date;
        metaDiv.appendChild(dateSpan);
      }
      textCellDiv.appendChild(metaDiv);
    }
    // title
    if (title) {
      const heading = document.createElement('h4');
      heading.textContent = title;
      heading.style.margin = '0.5em 0 0 0';
      textCellDiv.appendChild(heading);
    }

    // Add all text content from the card (for flexibility)
    // Get all direct text nodes and <div>, <h3> children except the image container
    // Defensive: get everything except the image container
    Array.from(card.children).forEach(child => {
      if (
        child.tagName !== 'DIV' ||
        !child.classList.contains('utility-aspect-2x3')
      ) {
        // For h3, already included as title
        if (child.tagName === 'H3') return;
        // For meta row, already included
        if (child.classList.contains('flex-horizontal')) return;
        // For other divs (if any), include their text
        if (child.tagName === 'DIV') {
          if (child.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = child.textContent.trim();
            textCellDiv.appendChild(p);
          }
        }
      }
    });

    rows.push([imgCell, textCellDiv]);
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
