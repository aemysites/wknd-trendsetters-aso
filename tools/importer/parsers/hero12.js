/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Find the background image (first direct child div > img)
  let bgImg = '';
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    const bgImgDiv = gridDivs[0];
    const img = bgImgDiv.querySelector('img');
    if (img) bgImg = img.cloneNode(true);
  }

  // 3. Find the content (headline, subhead, CTA)
  let contentCell = '';
  if (gridDivs.length > 1) {
    const contentDiv = gridDivs[1];
    const cardBody = contentDiv.querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        const gridChildren = Array.from(grid.children);
        const textCol = gridChildren.find(child => child.querySelector('h2, h1, .button-group, p'));
        if (textCol) {
          const frag = document.createElement('div');
          const heading = textCol.querySelector('h2, h1');
          if (heading) frag.appendChild(heading.cloneNode(true));
          const paras = textCol.querySelectorAll('p');
          paras.forEach(p => frag.appendChild(p.cloneNode(true)));
          const btnGroup = textCol.querySelector('.button-group');
          if (btnGroup) {
            const btn = btnGroup.querySelector('a, button');
            if (btn) frag.appendChild(btn.cloneNode(true));
          }
          if (frag.childNodes.length > 0) {
            contentCell = frag;
          } else {
            contentCell = null;
          }
        }
      }
    }
  }

  // Always output 3 rows: header, bgImg, content (but if contentCell is null, omit the third row)
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
  ];
  if (typeof contentCell !== 'undefined' && contentCell !== null) {
    rows.push([contentCell]);
  }

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
