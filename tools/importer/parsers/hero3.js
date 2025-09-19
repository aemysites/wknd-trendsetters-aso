/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate child divs
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero3)'];

  // --- BACKGROUND IMAGE ROW ---
  // Find image element (background)
  let bgImg = null;
  for (const div of topDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  // Defensive: If not found, leave cell empty
  const bgImgRow = [bgImg ? bgImg : ''];

  // --- CONTENT ROW ---
  // Find the card containing heading, subheading, and buttons
  let contentCell = '';
  for (const div of topDivs) {
    // Find nested card
    const card = div.querySelector('.card');
    if (card) {
      // Build content fragment
      const frag = document.createDocumentFragment();
      // Heading
      const h1 = card.querySelector('h1');
      if (h1) frag.appendChild(h1);
      // Subheading (paragraph)
      const sub = card.querySelector('p');
      if (sub) frag.appendChild(sub);
      // Button group
      const btnGroup = card.querySelector('.button-group');
      if (btnGroup) {
        // Only include links (not the group container)
        const btns = Array.from(btnGroup.querySelectorAll('a'));
        if (btns.length) {
          const btnWrap = document.createElement('div');
          btns.forEach(btn => btnWrap.appendChild(btn));
          frag.appendChild(btnWrap);
        }
      }
      contentCell = frag;
      break;
    }
  }
  const contentRow = [contentCell];

  // --- BUILD TABLE ---
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
