/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding all cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a card wrapper)
  const cardDivs = Array.from(grid.children);

  // Card texts in order from the screenshot (since source HTML has no text)
  const cardTexts = [
    [
      'Unmatched speed',
      'Helix is the fastest way to publish, create, and serve websites',
    ],
    [
      'Content at scale',
      'Helix allows you to publish more content in shorter time with smaller teams',
    ],
    [
      'Uncertainty eliminated',
      'Preview content at 100% fidelity, get predictable content velocity, and shorten project durations',
    ],
    [
      'Widen the talent pool',
      'Authors on Helix use Microsoft Word, Excel or Google Docs and need no training',
    ],
    [
      'The low-code way to developer productivity',
      'Say goodbye to complex APIs spanning multiple languages. Anyone with a little bit of HTML, CSS, and JS can build a site on Project Helix.',
    ],
    [
      'Headless is here',
      'Go directly from Microsoft Excel or Google Sheets to the web in mere seconds. Sanitize and collect form data at extreme scale with Project Helix Forms.',
    ],
    [
      'Peak performance',
      "Use Project Helix's serverless architecture to meet any traffic need. Use Project Helix's PageSpeed Insights Github action to evaluate every Pull-Request for Lighthouse Score.",
    ],
  ];

  // Table header row (block name) - exactly one column
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each card row must be an array of two elements: [image, text]
  cardDivs.forEach((cardDiv, i) => {
    // Find the image inside the card
    const imgContainer = cardDiv.querySelector('.utility-aspect-2x3');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    if (img && cardTexts[i]) {
      // Compose the text cell: title as heading, description as paragraph
      const frag = document.createElement('div');
      const h = document.createElement('h3');
      h.textContent = cardTexts[i][0];
      frag.appendChild(h);
      const p = document.createElement('p');
      p.textContent = cardTexts[i][1];
      frag.appendChild(p);
      rows.push([img, frag]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
