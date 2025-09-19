/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Get tab menu and tab panes
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = getDirectChildren(tabMenu, 'a');

  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = getDirectChildren(tabContent, 'div.w-tab-pane');

  // Defensive: Only proceed if tabLinks and tabPanes exist and match
  if (!tabLinks.length || !tabPanes.length || tabLinks.length !== tabPanes.length) {
    // Replace with header only, if structure is broken
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // 3. Build rows: [tab label, tab content]
  const rows = tabLinks.map((tabLink, idx) => {
    // Tab label: get text content from the inner div (if present)
    let tabLabel;
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLink.textContent.trim();
    }

    // Tab content: use the entire tab pane's main content
    // Defensive: find the grid inside each pane
    const pane = tabPanes[idx];
    let tabPaneContent;
    const grid = pane.querySelector('.w-layout-grid');
    if (grid) {
      tabPaneContent = grid;
    } else {
      // Fallback: use pane itself
      tabPaneContent = pane;
    }

    return [tabLabel, tabPaneContent];
  });

  // 4. Assemble table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(block);
}
