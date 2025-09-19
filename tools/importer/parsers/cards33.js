/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card anchor
  function extractCardInfo(cardAnchor) {
    // Find the image (first img descendant)
    const img = cardAnchor.querySelector('img');

    // Find the content container (the div after the image)
    const contentDiv = img.nextElementSibling;

    // Defensive: if contentDiv is missing, return minimal info
    if (!contentDiv) {
      return [img, ''];
    }

    // Extract tag (optional) and read time (optional)
    const metaRow = contentDiv.querySelector('.flex-horizontal');
    let metaFrag = null;
    if (metaRow) {
      // Clone metaRow to avoid moving it from original DOM
      metaFrag = document.createDocumentFragment();
      metaRow.childNodes.forEach((node) => {
        metaFrag.appendChild(node.cloneNode(true));
      });
    }

    // Extract title (h3)
    const title = contentDiv.querySelector('h3');
    // Extract description (p)
    const desc = contentDiv.querySelector('p');
    // Extract CTA (the last div inside contentDiv, with text 'Read')
    let cta = null;
    const ctaDivs = Array.from(contentDiv.querySelectorAll('div'));
    if (ctaDivs.length > 0) {
      // The last div is usually the CTA
      const lastDiv = ctaDivs[ctaDivs.length - 1];
      if (lastDiv.textContent.trim().toLowerCase() === 'read') {
        // Make a link with the card's href
        cta = document.createElement('a');
        cta.href = cardAnchor.href;
        cta.textContent = lastDiv.textContent.trim();
      }
    }

    // Compose the text cell's content as an array
    const textCell = [];
    if (metaFrag && metaFrag.textContent.trim()) {
      textCell.push(metaFrag);
    }
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    return [img, textCell];
  }

  // Build the table rows
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is an <a> direct child of the main element
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach((cardAnchor) => {
    rows.push(extractCardInfo(cardAnchor));
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
