/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards33)'];

  // Helper to extract card info from each <a>
  function extractCard(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');

    // Find card body container (the div after the image)
    const cardBody = img.nextElementSibling;
    let tag = '', time = '', heading = '', desc = '', cta = '';

    // Tag and time (first horizontal flex row)
    const flexRow = cardBody.querySelector('.flex-horizontal');
    if (flexRow) {
      const tagEl = flexRow.querySelector('.tag > div');
      if (tagEl) tag = tagEl.textContent.trim();
      const timeEl = flexRow.querySelector('.paragraph-sm');
      if (timeEl) time = timeEl.textContent.trim();
    }

    // Heading (h3)
    const headingEl = cardBody.querySelector('h3');
    if (headingEl) heading = headingEl.textContent.trim();

    // Description (p)
    const descEl = cardBody.querySelector('p');
    if (descEl) desc = descEl.textContent.trim();

    // CTA (last div, contains 'Read')
    const ctaEl = Array.from(cardBody.querySelectorAll('div')).find(div => div.textContent.trim().toLowerCase() === 'read');
    let ctaLink = null;
    if (ctaEl) {
      // Use the parent <a> href for the link
      ctaLink = document.createElement('a');
      ctaLink.href = cardEl.href;
      ctaLink.textContent = ctaEl.textContent.trim();
    }

    // Compose text cell
    const textCellContent = [];
    // Tag and time row
    if (tag || time) {
      const metaDiv = document.createElement('div');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.style.fontWeight = 'bold';
        metaDiv.appendChild(tagSpan);
      }
      if (time) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = ' ' + time;
        metaDiv.appendChild(timeSpan);
      }
      textCellContent.push(metaDiv);
    }
    // Heading
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading;
      textCellContent.push(h);
    }
    // Description
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc;
      textCellContent.push(p);
    }
    // CTA
    if (ctaLink) {
      textCellContent.push(ctaLink);
    }

    // Return [image, text cell]
    return [img, textCellContent];
  }

  // Get all immediate <a> children (each is a card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cardLinks.map(extractCard);

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
