/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children by tag/class
  const tabMenu = Array.from(element.children).find(
    (el) => el.classList.contains('w-tab-menu')
  );
  const tabContent = Array.from(element.children).find(
    (el) => el.classList.contains('w-tab-content')
  );

  // Defensive: If missing, abort
  if (!tabMenu || !tabContent) return;

  // Get tab labels
  const tabLinks = Array.from(tabMenu.children).filter(
    (el) => el.hasAttribute('data-w-tab')
  );

  // Get tab panes
  const tabPanes = Array.from(tabContent.children).filter(
    (el) => el.classList.contains('w-tab-pane')
  );

  // Build rows: header, then one row per tab (label, content)
  const rows = [];
  // Always use required header
  const headerRow = ['Tabs (tabs22)'];
  rows.push(headerRow);

  // For each tab, match label to content by data-w-tab
  tabLinks.forEach((tabLink) => {
    // Tab label: preserve the element (not just text)
    const label = tabLink.querySelector('div') || tabLink;
    const tabName = tabLink.getAttribute('data-w-tab');
    // Find matching pane
    const pane = tabPanes.find((p) => p.getAttribute('data-w-tab') === tabName);
    let content = '';
    if (pane) {
      // Use the grid inside the pane as content if present, else the pane itself
      const grid = pane.querySelector('.w-layout-grid') || pane;
      content = grid;
    }
    rows.push([label, content]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
