/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag name and class
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Get tab menu and tab content containers
  const tabMenu = Array.from(element.children).find((el) => el.classList.contains('w-tab-menu'));
  const tabContent = Array.from(element.children).find((el) => el.classList.contains('w-tab-content'));

  if (!tabMenu || !tabContent) {
    // Defensive: If structure is unexpected, do nothing
    return;
  }

  // 3. Get tab labels (in order)
  const tabLinks = Array.from(tabMenu.children).filter((el) => el.hasAttribute('data-w-tab'));
  // 4. Get tab panes (in order)
  const tabPanes = Array.from(tabContent.children).filter((el) => el.hasAttribute('data-w-tab'));

  // Defensive: Only process as many pairs as available
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  const rows = [headerRow];

  for (let i = 0; i < tabCount; i++) {
    const tabLabelLink = tabLinks[i];
    // The label is the text inside the div within the link
    let tabLabel = '';
    const labelDiv = tabLabelLink.querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLabelLink.textContent.trim();
    }

    // Tab content: use the main content inside the tab pane
    const tabPane = tabPanes[i];
    // The actual content is the first child (usually a grid div)
    let tabContentEl = tabPane.firstElementChild;
    // Defensive: If not found, fallback to the pane itself
    if (!tabContentEl) tabContentEl = tabPane;

    rows.push([
      tabLabel,
      tabContentEl
    ]);
  }

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
