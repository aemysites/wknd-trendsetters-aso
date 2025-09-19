/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Header row as specified
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) {
    // Defensive: fallback, do nothing if structure is not as expected
    return;
  }

  // Get all tab links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  // Get all tab panes (content)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: Only process as many panes as there are links
  for (let i = 0; i < Math.min(tabLinks.length, tabPanes.length); i++) {
    const link = tabLinks[i];
    const pane = tabPanes[i];

    // Tab label: Use the text content of the inner div if present, else link text
    let label = '';
    const labelDiv = link.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = link.textContent.trim();
    }

    // Tab content: Use the direct child of the pane (the grid)
    // Defensive: If not found, use the pane itself
    let contentEl = pane.querySelector(':scope > .w-layout-grid, :scope > div, :scope > *');
    if (!contentEl) {
      contentEl = pane;
    }

    rows.push([
      label,
      contentEl
    ]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
