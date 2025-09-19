/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract text content from a node, optionally as HTML
  function extractTextContent(node, asHTML = false) {
    if (!node) return '';
    return asHTML ? node.innerHTML : node.textContent.trim();
  }

  // Helper to extract the CTA link text ("Read") and wrap in <a>
  function extractCTA(cardLink, ctaText) {
    if (!cardLink || !ctaText) return null;
    const a = document.createElement('a');
    a.href = cardLink.href;
    a.textContent = ctaText;
    return a;
  }

  // Table header
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is an <a> direct child of the root grid
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach((cardLink) => {
    // Find the image (mandatory)
    const img = cardLink.querySelector('img');

    // Find the inner grid that contains the text content
    const contentGrid = cardLink.querySelector('div.w-layout-grid');
    let textContentDiv = null;
    if (contentGrid) {
      // The second child div inside the inner grid contains text
      // (after the image)
      const divs = Array.from(contentGrid.children).filter((el) => el.tagName === 'DIV');
      // The first div after the image is the text content
      textContentDiv = divs[0];
    }

    // Defensive: If not found, fallback to any div after the image
    if (!textContentDiv) {
      const divs = Array.from(cardLink.querySelectorAll('div'));
      textContentDiv = divs.length > 1 ? divs[1] : divs[0];
    }

    // Extract tag (eg. "Chill", "Sunny", etc.) and time (eg. "3 min read")
    let tag = '', time = '';
    if (textContentDiv) {
      const tagDiv = textContentDiv.querySelector('.tag');
      if (tagDiv) tag = extractTextContent(tagDiv);
      const timeDiv = textContentDiv.querySelector('.paragraph-sm');
      if (timeDiv) time = extractTextContent(timeDiv);
    }

    // Extract heading (h3)
    let heading = '';
    if (textContentDiv) {
      const h3 = textContentDiv.querySelector('h3');
      if (h3) heading = extractTextContent(h3);
    }

    // Extract description (p)
    let desc = '';
    if (textContentDiv) {
      const p = textContentDiv.querySelector('p');
      if (p) desc = extractTextContent(p);
    }

    // Extract CTA (the last div with text 'Read')
    let cta = null;
    if (textContentDiv) {
      const divs = Array.from(textContentDiv.querySelectorAll('div'));
      const readDiv = divs.find((d) => extractTextContent(d).toLowerCase() === 'read');
      if (readDiv) {
        cta = extractCTA(cardLink, 'Read');
      }
    }

    // Compose the text cell: tag + time (in a row), heading, desc, CTA
    const textCell = document.createElement('div');
    // Tag and time row
    if (tag || time) {
      const metaRow = document.createElement('div');
      metaRow.style.display = 'flex';
      metaRow.style.gap = '0.5em';
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.style.fontWeight = 'bold';
        metaRow.appendChild(tagSpan);
      }
      if (time) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = time;
        metaRow.appendChild(timeSpan);
      }
      textCell.appendChild(metaRow);
    }
    // Heading
    if (heading) {
      const h = document.createElement('strong');
      h.textContent = heading;
      textCell.appendChild(h);
      textCell.appendChild(document.createElement('br'));
    }
    // Description
    if (desc) {
      const p = document.createElement('span');
      p.textContent = desc;
      textCell.appendChild(p);
      textCell.appendChild(document.createElement('br'));
    }
    // CTA
    if (cta) {
      textCell.appendChild(cta);
    }

    // Add the row: [image, text cell]
    rows.push([
      img,
      textCell
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
