/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Get tab labels
  // Tab menu is the first child div with class w-tab-menu
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? tabMenu.querySelectorAll('a[role="tab"]') : [];

  // 3. Get tab content panes
  // Tab content is the second child div with class w-tab-content
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? tabContent.querySelectorAll('.w-tab-pane') : [];

  // Defensive: match tabs and panes by data-w-tab
  // Build a map of tab value to label and content
  const tabs = [];
  tabLinks.forEach((tabLink) => {
    const tabValue = tabLink.getAttribute('data-w-tab');
    // Label: use the inner text of the first div inside the link, or fallback to textContent
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Find matching pane
    let contentPane = null;
    tabPanes.forEach((pane) => {
      if (pane.getAttribute('data-w-tab') === tabValue) {
        contentPane = pane;
      }
    });
    if (contentPane) {
      // For content: use the first child of the pane (usually a grid div)
      let content = null;
      if (contentPane.children.length === 1) {
        content = contentPane.children[0];
      } else {
        // fallback: use the pane itself
        content = contentPane;
      }
      tabs.push({ label, content });
    }
  });

  // 4. Build rows: each tab is a row [label, content]
  const rows = tabs.map(tab => [tab.label, tab.content]);

  // 5. Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 6. Replace original element
  element.replaceWith(table);
}
