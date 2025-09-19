/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get tab labels and tab panes
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a.w-tab-link')) : [];
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];

  // Defensive: ensure we have matching tabs and panes
  const numTabs = Math.min(tabLinks.length, tabPanes.length);

  // Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  for (let i = 0; i < numTabs; i++) {
    // Tab label: get text from the inner div of the tab link
    let tabLabel = '';
    const labelDiv = tabLinks[i].querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLinks[i].textContent.trim();
    }

    // Tab content: use the grid inside the pane if present, else the whole pane
    let tabContentElem = null;
    const grid = tabPanes[i].querySelector('.w-layout-grid');
    if (grid) {
      tabContentElem = grid;
    } else {
      tabContentElem = tabPanes[i];
    }

    rows.push([tabLabel, tabContentElem]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
