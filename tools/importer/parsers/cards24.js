/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <a> card
  function extractCard(cardEl) {
    // Image: first img inside the card
    const imgWrapper = cardEl.querySelector('div.utility-aspect-2x3');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;
    
    // Text content: build a fragment
    const frag = document.createDocumentFragment();

    // Tag/date row
    const tagRow = cardEl.querySelector('.flex-horizontal');
    if (tagRow) {
      frag.appendChild(tagRow.cloneNode(true));
    }

    // Title (h3)
    const heading = cardEl.querySelector('h3');
    if (heading) {
      frag.appendChild(heading.cloneNode(true));
    }

    // Optionally, add a CTA link (the card itself is a link, but we do not duplicate it as CTA)
    // If you want to add a CTA, you could add a link to the blog post here
    // For now, we skip explicit CTA as per visual structure

    return [img, frag];
  }

  // Get all card <a> elements (direct children)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards24)']);

  // Card rows
  cardLinks.forEach(cardEl => {
    const [img, textFrag] = extractCard(cardEl);
    // Defensive: if no image, just use null
    rows.push([
      img || '',
      textFrag
    ]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(table);
}
