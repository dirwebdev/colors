# Checkpoint 01

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
        <div id="branding">My Brand</div>
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

body {
    font-family: Arial, sans-serif;
    background: #e0e0e0;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #414141;
    color: #f0f0f0;
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
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.grid-item .row1 {
    border-bottom: 1px solid black;
}

.row.hex-row, .row.rgba-row, .row.hsla-row {
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
    justify-content: space-between;
    padding: 20px;
    background: #414141;
    color: #f0f0f0;
}

footer #contact-info {
    display: flex;
    flex-direction: column;
}

.copy-message {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 30px;
    background: rgba(0,0,0,0.5);
    color: white;
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
                        <div class="copy-message">Copied!</div>
                    </div>
                    <div class="row hex-row">HEX</div>
                    <div class="row rgba-row">RGBA</div>
                    <div class="row hsla-row">HSLA</div>
                `;
                grid.appendChild(gridItem);

                gridItem.querySelectorAll('.row').forEach(row => {
                    row.addEventListener('click', function() {
                        navigator.clipboard.writeText(color[row.classList[1].replace('-row', '')]);
                        let message = this.parentNode.querySelector('.copy-message');
                        message.style.display = 'flex';
                        setTimeout(() => { message.style.display = 'none'; }, 2000);
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

