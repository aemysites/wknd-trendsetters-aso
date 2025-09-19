/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: block name
  const headerRow = ['Hero (hero14)'];

  // 2. Background image row
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: find the first img in the block
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: heading, subheading, CTA (if any)
  // Find the container with the heading and possible CTA
  let contentContainer = null;
  for (const div of gridDivs) {
    if (div.querySelector('h1')) {
      contentContainer = div;
      break;
    }
  }

  // Defensive: if not found, fallback to the whole element
  if (!contentContainer) contentContainer = element;

  // Gather heading, subheading, CTA
  const content = [];
  // Heading (h1)
  const h1 = contentContainer.querySelector('h1');
  if (h1) content.push(h1);
  // Subheading (h2, h3, h4)
  const h2 = contentContainer.querySelector('h2');
  if (h2) content.push(h2);
  const h3 = contentContainer.querySelector('h3');
  if (h3) content.push(h3);
  const h4 = contentContainer.querySelector('h4');
  if (h4) content.push(h4);
  // Paragraphs
  const ps = contentContainer.querySelectorAll('p');
  ps.forEach(p => content.push(p));
  // CTA: find first <a> in the content container
  const cta = contentContainer.querySelector('a');
  if (cta) content.push(cta);

  const contentRow = [content.length ? content : ''];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
