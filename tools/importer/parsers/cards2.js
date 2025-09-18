/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card block
  function getImage(card) {
    return card.querySelector('img');
  }

  // Helper to extract text content from a card block
  function getTextContent(card) {
    const frag = document.createDocumentFragment();
    // Tag (optional)
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      frag.appendChild(tagGroup.cloneNode(true));
    }
    // Heading (h3)
    const heading = card.querySelector('h3');
    if (heading) {
      frag.appendChild(heading.cloneNode(true));
    }
    // Paragraph (description)
    const para = card.querySelector('p');
    if (para) {
      frag.appendChild(para.cloneNode(true));
    }
    return frag;
  }

  // Find the main grid
  const grid = element.querySelector('.grid-layout');
  const cards = [];

  // First, get the large card (left side)
  const firstCard = grid.querySelector('.utility-link-content-block');
  if (firstCard) {
    const img = getImage(firstCard);
    const text = getTextContent(firstCard);
    cards.push([img, text]);
  }

  // Next, get the vertical stack of cards (right side)
  // These are inside .flex-horizontal.flex-vertical.flex-gap-sm
  const verticalGroups = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
  verticalGroups.forEach((group) => {
    // Each group contains multiple .utility-link-content-block elements
    const groupCards = group.querySelectorAll('.utility-link-content-block');
    groupCards.forEach((card) => {
      // Try to get image (if present)
      const img = getImage(card);
      let cellImg = img ? img : '';
      // Tag (optional)
      const tagGroup = card.querySelector('.tag-group');
      // Compose text
      const frag = document.createDocumentFragment();
      if (tagGroup) frag.appendChild(tagGroup.cloneNode(true));
      const heading = card.querySelector('h3');
      if (heading) frag.appendChild(heading.cloneNode(true));
      const para = card.querySelector('p');
      if (para) frag.appendChild(para.cloneNode(true));
      cards.push([cellImg, frag]);
    });
  });

  // Table header
  const headerRow = ['Cards (cards2)'];
  const tableRows = [headerRow];
  // Add all cards
  cards.forEach(([img, text]) => {
    tableRows.push([img || '', text]);
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
