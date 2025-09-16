/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for tab menu and content containers
  const tabMenu = Array.from(element.children).find(
    (el) => el.classList.contains('w-tab-menu')
  );
  const tabContent = Array.from(element.children).find(
    (el) => el.classList.contains('w-tab-content')
  );
  if (!tabMenu || !tabContent) return;

  // Get tab labels
  const tabLinks = tabMenu.querySelectorAll('a[role="tab"]');
  // Get tab panes
  const tabPanes = tabContent.querySelectorAll('.w-tab-pane');

  // Defensive: match tab labels to panes by data-w-tab
  const rows = [];
  tabLinks.forEach((tabLink) => {
    const tabName = tabLink.textContent.trim();
    const tabKey = tabLink.getAttribute('data-w-tab');
    // Find matching pane
    const pane = Array.from(tabPanes).find(
      (p) => p.getAttribute('data-w-tab') === tabKey
    );
    if (!pane) return;
    // Tab content: use the grid inside the pane
    const grid = pane.querySelector('.w-layout-grid');
    // Defensive: if no grid, fallback to pane
    const content = grid || pane;
    rows.push([tabName, content]);
  });

  // Table header
  const headerRow = ['Tabs (tabs22)'];
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
