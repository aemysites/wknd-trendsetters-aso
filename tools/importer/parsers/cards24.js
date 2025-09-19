/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extracts the image from the card anchor
  function extractImage(card) {
    // Find the first image inside the card
    return card.querySelector('img');
  }

  // Helper: Extracts the text content (tag, date, title) from the card anchor
  function extractTextContent(card) {
    const fragments = [];
    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Clone to avoid removing from DOM
      fragments.push(tagRow.cloneNode(true));
    }
    // Title (h3)
    const title = card.querySelector('h3');
    if (title) {
      fragments.push(title.cloneNode(true));
    }
    return fragments;
  }

  // 1. Header row
  const rows = [
    ['Cards (cards24)']
  ];

  // 2. Card rows
  // Each direct child <a> is a card
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // First column: image
    const img = extractImage(card);
    // Second column: text content (tag/date + title)
    const textContent = extractTextContent(card);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
