document.addEventListener('DOMContentLoaded', (event) => {
    fetch('scripts/colors.json')
        .then(response => response.json())
        .then(data => {
            let grid = document.getElementById('color-grid');
            data.colors.forEach(color => {
                let gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.id = color.id.replace("#", "");
                gridItem.innerHTML = `
                    <div class="row1" style="background-color: ${color.id};"></div>
                    <div class="row">${color.id}</div>
                    <div class="row">${color.rgba || ""}</div>
                    <div class="row">${color.hsla || ""}</div>
                    <div class="row">${color.name || ""}</div>
                `;
                grid.appendChild(gridItem);
                gridItem.addEventListener('click', () => {
                    navigator.clipboard.writeText(gridItem.textContent);
                });
            });
        });

    fetch('scripts/main-nav.json')
        .then(response => response.json())
        .then(data => {
            let header = document.getElementById('main-header');
            data.navItems.forEach(item => {
                let button = document.createElement('button');
                button.textContent = item;
                header.appendChild(button);
            });
        });

    fetch('scripts/footer.json')
        .then(response => response.json())
        .then(data => {
            let footer = document.getElementById('main-footer');
            let copyInfo = document.createElement('p');
            copyInfo.textContent = data.copyInfo;
            footer.appendChild(copyInfo);
            data.footerItems.forEach(item => {
                let button = document.createElement('button');
                button.textContent = item;
                footer.appendChild(button);
            });
        });
});
