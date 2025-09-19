/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card div
  function extractCardContent(cardDiv) {
    // Find the first image
    const img = cardDiv.querySelector('img');
    // Find the text container (h3 + p)
    let textContent = null;
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      // Use the text container directly
      textContent = textContainer;
    } else {
      // Defensive: If no text container, try to find h3 and p
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        const wrapper = document.createElement('div');
        if (h3) wrapper.appendChild(h3);
        if (p) wrapper.appendChild(p);
        textContent = wrapper;
      }
    }
    return [img, textContent].filter(Boolean);
  }

  // Get all direct children of the grid (each card or image)
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];

  // Header row as specified
  rows.push(['Cards (cards25)']);

  // For each card/image block
  cards.forEach((cardDiv) => {
    // Find the image
    const img = cardDiv.querySelector('img');
    // Try to find text content (h3 + p)
    let textContent = null;
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      textContent = textContainer;
    } else {
      // Defensive fallback: look for h3 and p
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        const wrapper = document.createElement('div');
        if (h3) wrapper.appendChild(h3);
        if (p) wrapper.appendChild(p);
        textContent = wrapper;
      }
    }
    // Only push rows with an image
    if (img) {
      rows.push([img, textContent || '']);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
