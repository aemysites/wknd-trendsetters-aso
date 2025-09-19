/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Find tab labels and tab contents
  // The first child div is the tab menu, the second is the tab contents
  const children = getDirectChildren(element, 'div');
  if (children.length < 2) return;

  const tabMenu = children[0];
  const tabContent = children[1];

  // Get tab labels
  const tabLinks = getDirectChildren(tabMenu, 'a');
  const labels = tabLinks.map(link => {
    // The label is the text inside the inner div
    const labelDiv = link.querySelector('div');
    // Defensive: fallback to link text if no inner div
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Get tab panes (each tab's content)
  const tabPanes = getDirectChildren(tabContent, 'div');

  // Defensive: Only process as many tabs as both labels and panes exist
  const tabCount = Math.min(labels.length, tabPanes.length);

  // 3. Build rows: each row is [label, content]
  const rows = [];
  for (let i = 0; i < tabCount; i++) {
    const label = labels[i];
    const pane = tabPanes[i];
    // The actual content is inside a grid div within pane
    // We'll grab the first child div inside pane
    const gridDiv = pane.querySelector('div');
    // Defensive: fallback to pane itself if gridDiv missing
    rows.push([
      label,
      gridDiv ? gridDiv : pane
    ]);
  }

  // 4. Compose table data
  const cells = [headerRow, ...rows];

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
