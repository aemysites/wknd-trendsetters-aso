/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the table data: header row (one column), then each row (two columns)
  const headerRow = ['Cards (cards8)'];

  // Get all immediate children (each is a card image container)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build table rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Clone the image so we don't move it from the DOM
    const imgClone = img.cloneNode(true);
    // Use the image alt text as the card's text content (required, even if minimal)
    const altText = img.getAttribute('alt') || 'Card';
    return [imgClone, altText];
  }).filter(Boolean);

  // Create the table manually: header row (one column), data rows (two columns)
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = headerRow[0];
  headerTr.appendChild(headerTh);
  thead.appendChild(headerTr);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  rows.forEach(([img, altText]) => {
    const tr = document.createElement('tr');
    const tdImg = document.createElement('td');
    tdImg.appendChild(img);
    const tdText = document.createElement('td');
    tdText.textContent = altText;
    tr.appendChild(tdImg);
    tr.appendChild(tdText);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
