# Checkpoint 02

## Instructions: This will be a savepoint for you.  If I ask you to pull up checkpoint_01.md:
1. Display this file.

## html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Grid</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <header>
        <div id="branding">
            <img id="brand-logo" src="" alt="Brand Logo">
            <span id="brand-name"></span>
        </div>
        <nav></nav>
    </header>
    <main>
        <div id="color-grid"></div>
    </main>
    <footer>
        <div id="contact-info"></div>
        <div id="copyright-info"></div>
        <div id="footer-links"></div>
    </footer>
    <script src="scripts/scripts.js"></script>
</body>
</html>
```

## css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --header-footer-color: #123456;
    --body-color: #789abc;
}

body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--body-color);
    font-family: Arial, sans-serif;
}

header, footer {
    flex-shrink: 0;
    background-color: var(--header-footer-color);
    color: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

header a, footer a {
    color: #f0f0f0;
    text-decoration: none;
    margin: 0 10px;
}

main {
    flex-grow: 1;
}

#color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    padding: 10px;
}

.grid-item {
    border: 1px solid black;
    overflow: hidden;
    cursor: pointer;
}

.grid-item > div {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.grid-item .row1 {
    border-bottom: 1px solid white;
}

.grid-item .copy-message {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    background: rgba(255,255,255,0.7);
    color: black;
    transition: all 2s ease-in-out;
}

.row.hex-row, .row.rgba-row, .row.hsla-row {
    height: 25px;
    border: 1px solid white;
    background-color: black;
    color: white;
}

@media (min-width: 1200px) {
    #color-grid {
        grid-template-columns: repeat(8, 1fr);
    }
}

@media (max-width: 991px) {
    #color-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 767px) {
    #color-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 575px) {
    #color-grid {
        grid-template-columns: 1fr;
    }
}

footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

footer #contact-info, #copyright-info, #footer-links {
    display: flex;
    flex-direction: column;
}

.copy-message {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 50px;
    background: rgba(255,255,255,0.5);
    color: black;
}
```

## js
```js
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('scripts/colors.json')
        .then(response => response.json())
        .then(data => {
            let grid = document.getElementById('color-grid');
            data.colors.forEach(color => {
                let gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.id = color.hex.replace("#", "");
                gridItem.innerHTML = `
                    <div class="row row1" style="background-color: ${color.hex};">
                        <div class="copy-message"></div>
                    </div>
                    <div class="row hex-row">HEX</div>
                    <div class="row rgba-row">RGBA</div>
                    <div class="row hsla-row">HSLA</div>
                `;
                grid.appendChild(gridItem);

                gridItem.querySelectorAll('.row').forEach(row => {
                    row.addEventListener('click', function() {
                        navigator.clipboard.writeText(color[this.classList[1].replace('-row', '')]);
                        let message = this.parentNode.querySelector('.copy-message');
                        message.style.display = 'flex';
                        message.textContent = `${this.classList[1].toUpperCase().replace('-ROW', '')} Copied!`;
                        setTimeout(() => { 
                            message.style.display = 'none'; 
                        }, 2000);
                    });

                    row.addEventListener('mouseover', function() {
                        this.textContent = color[this.classList[1].replace('-row', '')];
                    });

                    row.addEventListener('mouseout', function() {
                        this.textContent = this.classList[1].toUpperCase().replace('-ROW', '');
                    });
                });
            });
        });

    fetch('scripts/main-nav.json')
        .then(response => response.json())
        .then(data => {
            document.querySelector('#branding').innerHTML = `
                <img src="${data.branding.logo}" alt="${data.branding.name}">
                ${data.branding.name}
            `;
            let nav = document.querySelector('nav');
            data.items.forEach(item => {
                let link = document.createElement('a');
                link.href = item.href;
                link.textContent = item.text;
                nav.appendChild(link);
            });
        });

    fetch('scripts/footer.json')
        .then(response => response.json())
        .then(data => {
            let footerContact = document.getElementById('contact-info');
            let name = document.createElement('p');
            name.textContent = data.contactInfo.name;
            footerContact.appendChild(name);
            let company = document.createElement('p');
            company.textContent = data.contactInfo.company;
            footerContact.appendChild(company);
            let email = document.createElement('p');
            email.textContent = data.contactInfo.email;
            footerContact.appendChild(email);

            let footerCopyInfo = document.getElementById('copyright-info');
            footerCopyInfo.textContent = data.copyInfo;

            let footerLinks = document.getElementById('footer-links');
            data.footerItems.forEach(item => {
                let link = document.createElement('a');
                link.href = '#';
                link.textContent = item;
                footerLinks.appendChild(link);
            });
        });
});
```

## json
1. colors.json
```json
{
  "colors": [
    {
      "hex": "#123456",
      "rgba": "(18, 52, 86, 1)",
      "hsla": "(210, 65%, 20%, 1)"
    },
    {
      "hex": "#789abc",
      "rgba": "(120, 154, 188, 1)",
      "hsla": "(210, 37%, 60%, 1)"
    }
  ]
}

```
2. main-nav.json
```json
{
  "branding": {
    "name": "",
    "logo": "images/logo.png"
  },
  "items": [
    {
      "text": "Home",
      "href": "#"
    },
    {
      "text": "About",
      "href": "#"
    },
    {
      "text": "Contact",
      "href": "#"
    }
  ]
}

```

