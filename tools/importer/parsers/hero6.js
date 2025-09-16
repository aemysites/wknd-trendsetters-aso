/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (first <img> in the hero block)
  const bgImg = element.querySelector('img');

  // Find the card containing heading, subheading, and CTAs
  const card = element.querySelector('.card');

  // Table header must match target block name exactly
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [card ? card : ''];

  // Create the table with 1 column and 3 rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
