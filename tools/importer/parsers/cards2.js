/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get image and text from a card anchor
  function extractCardContent(cardEl) {
    let img = cardEl.querySelector('img');
    // Find all tag elements (optional)
    const tagGroup = cardEl.querySelector('.tag-group');
    let tags = [];
    if (tagGroup) {
      tags = Array.from(tagGroup.children);
    }
    // Find heading (h3)
    let heading = cardEl.querySelector('h3');
    // Find paragraph
    let paragraph = cardEl.querySelector('p');
    // Compose text cell
    const textContent = [];
    if (tags.length) {
      textContent.push(...tags);
    }
    if (heading) {
      textContent.push(heading);
    }
    if (paragraph) {
      textContent.push(paragraph);
    }
    return [img, textContent];
  }

  // Main grid container
  const grid = element.querySelector('.grid-layout');
  const rows = [];

  // Header row
  rows.push(['Cards (cards2)']);

  // First card (large, left)
  const firstCard = grid.querySelector('a.utility-link-content-block');
  if (firstCard) {
    // Image is inside a div
    const imgDiv = firstCard.querySelector('div[class*="utility-aspect-"]');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Tag
    const tagGroup = firstCard.querySelector('.tag-group');
    let tags = [];
    if (tagGroup) {
      tags = Array.from(tagGroup.children);
    }
    // Heading
    let heading = firstCard.querySelector('h3');
    // Paragraph
    let paragraph = firstCard.querySelector('p');
    const textContent = [];
    if (tags.length) {
      textContent.push(...tags);
    }
    if (heading) {
      textContent.push(heading);
    }
    if (paragraph) {
      textContent.push(paragraph);
    }
    rows.push([img, textContent]);
  }

  // Second column: two cards with images
  // Find the flex-horizontal.flex-vertical.flex-gap-sm (second column)
  const secondCol = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (secondCol) {
    const cardLinks = secondCol.querySelectorAll('a.utility-link-content-block');
    cardLinks.forEach((cardEl) => {
      // Image is inside a div
      const imgDiv = cardEl.querySelector('div[class*="utility-aspect-"]');
      let img = imgDiv ? imgDiv.querySelector('img') : null;
      // Tag
      const tagGroup = cardEl.querySelector('.tag-group');
      let tags = [];
      if (tagGroup) {
        tags = Array.from(tagGroup.children);
      }
      // Heading
      let heading = cardEl.querySelector('h3');
      // Paragraph
      let paragraph = cardEl.querySelector('p');
      const textContent = [];
      if (tags.length) {
        textContent.push(...tags);
      }
      if (heading) {
        textContent.push(heading);
      }
      if (paragraph) {
        textContent.push(paragraph);
      }
      rows.push([img, textContent]);
    });
  }

  // Third column: text-only cards separated by dividers
  const thirdCol = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm')[1];
  if (thirdCol) {
    // Each card is an <a>, divider is a <div class="divider">
    const children = Array.from(thirdCol.children);
    children.forEach((child) => {
      if (child.matches('a.utility-link-content-block')) {
        // No image, just text
        let heading = child.querySelector('h3');
        let paragraph = child.querySelector('p');
        const textContent = [];
        if (heading) {
          textContent.push(heading);
        }
        if (paragraph) {
          textContent.push(paragraph);
        }
        // Always use two columns, first cell empty if no image
        rows.push(['', textContent]);
      }
    });
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
