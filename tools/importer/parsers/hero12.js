/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: find background image (first immediate child with img)
  let bgImgDiv = children.find(div => div.querySelector('img.cover-image.utility-position-absolute'));
  let bgImg = bgImgDiv ? bgImgDiv.querySelector('img.cover-image.utility-position-absolute') : null;

  // Defensive: find card content (second immediate child)
  let cardDiv = children.find(div => div.querySelector('.card'));
  let cardBody = cardDiv ? cardDiv.querySelector('.card-body') : null;

  // Defensive: find foreground image (inside card grid)
  let fgImg = cardBody ? cardBody.querySelector('img.cover-image.utility-aspect-1x1') : null;

  // Defensive: find text content (h2, paragraphs, button)
  let h2 = cardBody ? cardBody.querySelector('h2') : null;
  let flexVertical = cardBody ? cardBody.querySelector('.flex-vertical') : null;
  let buttonGroup = cardBody ? cardBody.querySelector('.button-group') : null;
  let button = buttonGroup ? buttonGroup.querySelector('a.button') : null;

  // Compose text content cell
  let textContent = [];
  if (h2) textContent.push(h2);
  if (flexVertical) {
    // Each flex-horizontal is a row with icon and paragraph
    Array.from(flexVertical.querySelectorAll('.flex-horizontal')).forEach(row => {
      textContent.push(row);
      // Add divider after each except last
      const divider = row.nextElementSibling;
      if (divider && divider.classList.contains('divider')) {
        textContent.push(divider);
      }
    });
  }
  if (button) textContent.push(button);

  // Compose the table rows
  const headerRow = ['Hero (hero12)'];
  // Row 2: background image (optional)
  const bgRow = [bgImg ? bgImg : ''];
  // Row 3: foreground image + text content (combine visually as screenshot shows)
  // If fgImg exists, group it with textContent
  let contentRow;
  if (fgImg) {
    // Group image and text in a div for layout fidelity
    const groupDiv = document.createElement('div');
    groupDiv.style.display = 'flex';
    groupDiv.style.alignItems = 'flex-start';
    groupDiv.appendChild(fgImg);
    // Wrap text content in another div
    const textDiv = document.createElement('div');
    textContent.forEach(el => textDiv.appendChild(el));
    groupDiv.appendChild(textDiv);
    contentRow = [groupDiv];
  } else {
    contentRow = [textContent];
  }

  // Build the table
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
