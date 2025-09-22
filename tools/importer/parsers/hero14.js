/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the background image (img inside parallax container)
  function getBackgroundImage(el) {
    // Look for .ix-parallax-scale-out-hero > img
    const parallaxDiv = el.querySelector('.ix-parallax-scale-out-hero');
    if (parallaxDiv) {
      const img = parallaxDiv.querySelector('img');
      if (img) return img;
    }
    // Fallback: any img in first grid cell
    const firstGridCell = el.querySelector('.w-layout-grid > div');
    if (firstGridCell) {
      const img = firstGridCell.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to find the headline/title
  function getHeadline(el) {
    // Look for h1 inside .container
    const h1 = el.querySelector('.container h1');
    if (h1) return h1;
    // Fallback: any h1
    const anyH1 = el.querySelector('h1');
    if (anyH1) return anyH1;
    return null;
  }

  // Helper to find subheading and CTA (button/link)
  function getSubheadingAndCTA(el) {
    // Subheading: h2, h3, p, etc. inside .container
    const container = el.querySelector('.container');
    let subheading = null;
    let cta = null;
    if (container) {
      // Try h2, h3, p
      subheading = container.querySelector('h2, h3, p');
      // CTA: look for a button or link inside .button-group
      const buttonGroup = container.querySelector('.button-group');
      if (buttonGroup) {
        cta = buttonGroup.querySelector('a, button');
      }
    }
    return { subheading, cta };
  }

  // Compose table rows
  const headerRow = ['Hero (hero14)'];

  // Row 2: background image
  const bgImg = getBackgroundImage(element);
  const imageRow = [bgImg ? bgImg : ''];

  // Row 3: headline, subheading, CTA
  const headline = getHeadline(element);
  const { subheading, cta } = getSubheadingAndCTA(element);
  // Compose cell content
  const textCellContent = [];
  if (headline) textCellContent.push(headline);
  if (subheading) textCellContent.push(subheading);
  if (cta) textCellContent.push(cta);
  const textRow = [textCellContent.length ? textCellContent : ''];

  // Build table
  const cells = [headerRow, imageRow, textRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}
