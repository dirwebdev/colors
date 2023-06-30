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
