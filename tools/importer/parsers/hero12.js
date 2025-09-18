/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children divs
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));

  // --- Row 1: Block name header ---
  const headerRow = ['Hero (hero12)'];

  // --- Row 2: Background Image ---
  let bgImg = '';
  if (topDivs.length > 0) {
    const bgImgDiv = topDivs[0];
    const img = bgImgDiv.querySelector('img');
    if (img) bgImg = img;
  }
  const bgImgRow = [bgImg];

  // --- Row 3: Content (headline, subheading, CTA, etc.) ---
  let contentCell = '';
  if (topDivs.length > 1) {
    const contentDiv = topDivs[1];
    const cardBody = contentDiv.querySelector('.card-body');
    if (cardBody) {
      // Collect all content: headline, subpoints, cta
      const frag = document.createDocumentFragment();
      // Headline
      const h2 = cardBody.querySelector('h2');
      if (h2) frag.appendChild(h2.cloneNode(true));
      // Subpoints: all .flex-horizontal with a <p>
      const subpoints = cardBody.querySelectorAll('.flex-horizontal p');
      subpoints.forEach(p => {
        frag.appendChild(p.cloneNode(true));
      });
      // CTA button
      const button = cardBody.querySelector('.button-group a, .button-group button');
      if (button) frag.appendChild(button.cloneNode(true));
      // Set contentCell to fragment if content, else empty string
      contentCell = frag.childNodes.length > 0 ? frag : '';
    }
  }

  // Always produce 3 rows (header, bg, content), third row empty if no content
  const cells = [headerRow, bgImgRow, [contentCell]];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
