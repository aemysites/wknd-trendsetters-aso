/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children by tag/class
  function getDirectChildrenByClass(parent, className) {
    return Array.from(parent.children).filter(child => child.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Find tab menu and content panes
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Defensive: Only proceed if tabLinks and tabPanes lengths match
  const numTabs = Math.min(tabLinks.length, tabPanes.length);
  const rows = [headerRow];

  for (let i = 0; i < numTabs; i++) {
    // Get tab label (text inside .paragraph-lg or fallback to link text)
    let label = '';
    const link = tabLinks[i];
    const labelDiv = link.querySelector('.paragraph-lg');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = link.textContent.trim();
    }
    // Get tab content (the .w-tab-pane's first child, which is the content grid)
    const pane = tabPanes[i];
    // Defensive: find the grid inside the pane
    let contentElem = null;
    if (pane) {
      // Try to find the grid-layout inside the pane
      contentElem = pane.querySelector('.grid-layout');
      if (!contentElem) {
        // Fallback: use the pane itself
        contentElem = pane;
      }
    }
    rows.push([
      label,
      contentElem ? contentElem : document.createTextNode('')
    ]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
