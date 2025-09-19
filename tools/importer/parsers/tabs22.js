/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Header row as required
  const headerRow = ['Tabs (tabs22)'];

  // Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: if missing, abort
  if (!tabMenu || !tabContent) return;

  // Get all tab labels (links)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  // Get all tab panes (content)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Build rows: each tab label and its content
  const rows = tabLinks.map((tabLink, idx) => {
    // Tab label: use inner text of the label div inside the link
    let labelDiv = tabLink.querySelector('div');
    let tabLabel = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();
    // Tab content: use the direct child grid inside the pane
    let pane = tabPanes[idx];
    let contentGrid = pane ? pane.querySelector('.w-layout-grid') : null;
    // Defensive: fallback to pane itself if grid missing
    let tabContentCell = contentGrid || pane;
    return [tabLabel, tabContentCell];
  });

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
