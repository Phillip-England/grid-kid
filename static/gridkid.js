class GridKid extends HTMLElement {
  static gridKidInitialized = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.style.display = 'none';

    if (!GridKid.gridKidInitialized) {
      this.initializeGridKid();
      GridKid.gridKidInitialized = true;
    }

    requestAnimationFrame(() => this.applyGridTemplate());
  }

  initializeGridKid() {
    document.querySelectorAll('[area]').forEach(element => {
      const areaValue = element.getAttribute('area');
      element.style.gridArea = areaValue;
      element.classList.add(areaValue); // Optionally add a class with the same name
    });
  }

  applyGridTemplate() {
    const parent = this.parentElement;
    if (!parent) return;
    const styles = [];
    for (const attr of this.attributes) {
      if (attr.name.startsWith("at-")) {
        const breakpoint = attr.name === "at-default" ? null : attr.name.replace("at-", "") + "px";
        const gridTemplateAreas = attr.value.replace(/'/g, '"'); // Convert single quotes to double quotes

        if (breakpoint) {
          styles.push(`
            @media (min-width: ${breakpoint}) {
              ${this.getParentSelector(parent)} {
                display: grid;
                grid-template-areas: ${gridTemplateAreas};
              }
            }
          `);
        } else {
          styles.push(`
            ${this.getParentSelector(parent)} {
              display: grid;
              grid-template-areas: ${gridTemplateAreas};
            }
          `);
        }
      }
    }
    if (styles.length > 0) {
      const styleTag = document.createElement("style");
      styleTag.textContent = styles.join("\n");
      document.head.appendChild(styleTag);
    }
  }

  getParentSelector(parent) {
    if (!parent.dataset.gridId) {
      parent.dataset.gridId = `grid-${Math.random().toString(36).substr(2, 9)}`;
      parent.classList.add(parent.dataset.gridId);
    }
    return `.${parent.dataset.gridId}`;
  }
}

customElements.define("grid-kid", GridKid);
