/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card anchor/div
  function extractImage(card) {
    // Look for the first img inside the card
    return card.querySelector('img');
  }

  // Helper to extract text content from a card anchor/div
  function extractText(card) {
    // We'll collect tag (if present), heading, and paragraph
    const textContent = document.createElement('div');
    // Tag (optional)
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      textContent.appendChild(tagGroup.cloneNode(true));
    }
    // Heading (h3 or h4)
    const heading = card.querySelector('h3, h4');
    if (heading) {
      textContent.appendChild(heading.cloneNode(true));
    }
    // Paragraph (optional)
    const paragraph = card.querySelector('p');
    if (paragraph) {
      textContent.appendChild(paragraph.cloneNode(true));
    }
    return textContent;
  }

  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const rows = [];
  // Header row
  const headerRow = ['Cards (cards2)'];
  rows.push(headerRow);

  // Collect all cards (anchors with content) that have an image/icon (MANDATORY for this block)
  // The grid contains: [featureCard, imageCardsGroup, textCardsGroup]
  const gridChildren = Array.from(grid.children);

  // 1. Feature card (large, left)
  const featureCard = gridChildren[0];
  if (featureCard && featureCard.matches('a')) {
    const img = extractImage(featureCard);
    if (img) {
      const text = extractText(featureCard);
      rows.push([
        img.cloneNode(true),
        text
      ]);
    }
  }

  // 2. Two image cards (right, top)
  const imageCardsGroup = gridChildren[1];
  if (imageCardsGroup) {
    const anchors = Array.from(imageCardsGroup.querySelectorAll(':scope > a'));
    anchors.forEach(card => {
      const img = extractImage(card);
      if (img) {
        const text = extractText(card);
        rows.push([
          img.cloneNode(true),
          text
        ]);
      }
    });
  }

  // 3. Text-only cards (right, bottom) - SKIP these, since image/icon is mandatory for this block
  // (Do not add rows for cards without an image/icon)

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
