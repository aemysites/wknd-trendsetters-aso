/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate children of a given parent
  function getImmediateChildrenByClass(parent, className) {
    return Array.from(parent.children).filter((el) => el.classList.contains(className));
  }

  // Table header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // Defensive: Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) {
    // If structure is unexpected, do nothing
    return;
  }

  // Get all tab labels (menu links)
  const tabLinks = tabMenu.querySelectorAll('a.w-tab-link');
  // Get all tab panes (content)
  const tabPanes = tabContent.querySelectorAll('.w-tab-pane');

  // Defensive: Only process as many tabs as there are panes
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  for (let i = 0; i < tabCount; i++) {
    const tabLink = tabLinks[i];
    // Tab label: Use the inner text of the tab link (or its child div)
    let tabLabel = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLink.textContent.trim();
    }
    // Tab content: Use the entire content of the tab pane
    const tabPane = tabPanes[i];
    // Defensive: Use the first grid-layout child if present, else the pane itself
    let tabPaneContent = tabPane.querySelector('.grid-layout') || tabPane;
    // Add row: [Tab Label, Tab Content]
    rows.push([tabLabel, tabPaneContent]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(block);
}
