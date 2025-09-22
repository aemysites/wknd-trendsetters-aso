/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Find tab menu and tab content containers
  // The first child is the tab menu, the second is the tab content
  const children = getDirectChildren(element, 'div');
  if (children.length < 2) {
    // Defensive: not enough children to parse tabs
    return;
  }
  const tabMenu = children[0];
  const tabContent = children[1];

  // 3. Get all tab links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a[role="tab"]'));

  // 4. Get all tab panes (contents)
  const tabPanes = Array.from(tabContent.querySelectorAll('div[role="tabpanel"]'));

  // Defensive: match tabLinks to tabPanes by data-w-tab attribute
  // Build a map from tab name to label element
  const tabLabelMap = {};
  tabLinks.forEach(link => {
    const tabName = link.getAttribute('data-w-tab');
    // Use the inner div for label if present, else textContent
    const labelDiv = link.querySelector('div');
    tabLabelMap[tabName] = labelDiv ? labelDiv : link;
  });

  // For each tab pane, get its label and content
  tabPanes.forEach(tabPane => {
    const tabName = tabPane.getAttribute('data-w-tab');
    const label = tabLabelMap[tabName] || tabName;
    // The tab content is the direct child (the grid)
    // We'll use the grid div as the content cell
    const grid = tabPane.querySelector('div');
    // Defensive: if no grid, use tabPane itself
    const content = grid || tabPane;
    rows.push([label, content]);
  });

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
