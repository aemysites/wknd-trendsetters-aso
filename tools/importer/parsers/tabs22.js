/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Find tab labels and tab panes
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Defensive: if not found, don't proceed
  if (!tabLinks.length || !tabPanes.length) {
    return;
  }

  // 3. Build rows: [tab label, tab content]
  const rows = tabLinks.map((tabLink, idx) => {
    // Tab label (text content of inner div if present, else textContent)
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }

    // Tab content: find corresponding tab pane by index
    const tabPane = tabPanes[idx];
    let content = '';
    if (tabPane) {
      // The actual content is inside the first child div of tabPane
      // Defensive: if not, use tabPane itself
      const grid = tabPane.querySelector('.w-layout-grid') || tabPane;
      content = grid;
    }
    return [label, content];
  });

  // 4. Assemble table data
  const tableData = [headerRow, ...rows];

  // 5. Create table and replace element
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
