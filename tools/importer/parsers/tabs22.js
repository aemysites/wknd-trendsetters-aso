/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for tab menu and tab content containers
  const tabMenu = Array.from(element.children).find(child => child.classList.contains('w-tab-menu'));
  const tabContent = Array.from(element.children).find(child => child.classList.contains('w-tab-content'));
  if (!tabMenu || !tabContent) return;

  // Get tab labels from tabMenu
  const tabLinks = Array.from(tabMenu.querySelectorAll('a'));
  // Get tab panes from tabContent
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: ensure labels and panes match
  if (tabLinks.length !== tabPanes.length) return;

  // Header row as per guidelines
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const labelDiv = tabLinks[i].querySelector('div');
    // Defensive: fallback to textContent if div not found
    let label;
    if (labelDiv) {
      label = labelDiv;
    } else {
      label = document.createElement('span');
      label.textContent = tabLinks[i].textContent.trim();
    }

    // Tab content: use the entire tab pane's main grid
    const paneGrid = tabPanes[i].querySelector('.w-layout-grid');
    let content;
    if (paneGrid) {
      content = paneGrid;
    } else {
      // fallback: use the whole pane
      content = tabPanes[i];
    }

    rows.push([label, content]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
