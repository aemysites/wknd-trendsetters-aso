/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card-link element
  function extractCardInfo(cardLink) {
    // Image: first .utility-aspect-3x2 > img
    const imageWrapper = cardLink.querySelector('.utility-aspect-3x2');
    let image = null;
    if (imageWrapper) {
      image = imageWrapper.querySelector('img');
    }

    // Text content: .utility-padding-all-1rem
    const textWrapper = cardLink.querySelector('.utility-padding-all-1rem');
    let tag = null;
    let title = null;
    let desc = null;
    let cta = null;
    if (textWrapper) {
      // Tag (optional)
      const tagDiv = textWrapper.querySelector('.tag-group .tag');
      if (tagDiv) {
        tag = tagDiv.cloneNode(true);
      }
      // Title (h3)
      const h3 = textWrapper.querySelector('h3');
      if (h3) {
        title = h3.cloneNode(true);
      }
      // Description (p)
      const p = textWrapper.querySelector('p');
      if (p) {
        desc = p.cloneNode(true);
      }
    }
    // CTA: the card itself is a link, so use its href if not '#'
    if (cardLink.href && cardLink.getAttribute('href') && cardLink.getAttribute('href') !== '#') {
      // Only add CTA if the link is not just '#'
      const url = cardLink.getAttribute('href');
      // Use the title as CTA text if available, else fallback
      let ctaText = 'Read more';
      if (title && title.textContent) {
        ctaText = title.textContent.trim();
      }
      // Only add CTA if the link is not just the homepage ('/')
      if (url && url !== '/') {
        cta = document.createElement('a');
        cta.href = url;
        cta.textContent = ctaText;
      }
    }
    // Compose text cell content
    const textCell = [];
    if (tag) textCell.push(tag);
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [image, textCell];
  }

  // Get all card links (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards10)']);
  // Card rows
  cards.forEach(card => {
    const [image, textCell] = extractCardInfo(card);
    rows.push([image, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
