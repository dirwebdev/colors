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
                    <div class="row1" style="background-color: ${color.hex};"></div>
                    <div class="row hex-row"><span>Hex</span></div>
                    <div class="row rgba-row"><span>Rgba</span></div>
                    <div class="row hsla-row"><span>Hsla</span></div>
                `;

                let rows = gridItem.querySelectorAll('.row');
                rows.forEach(row => {
                    row.addEventListener('mouseenter', () => {
                        let prefix = row.querySelector('span').textContent;
                        row.querySelector('span').textContent = color[prefix.toLowerCase()];
                    });
                    row.addEventListener('mouseleave', () => {
                        let prefix = row.querySelector('span').textContent.split(': ')[0];
                        row.querySelector('span').textContent = prefix;
                    });
                    row.addEventListener('click', () => {
                        let copyText = row.querySelector('span').textContent;
                        navigator.clipboard.writeText(copyText);

                        // Create copy message and show it
                        let copyMessage = document.createElement('div');
                        copyMessage.classList.add('copy-message');
                        copyMessage.textContent = `Copied ${copyText}`;
                        row.appendChild(copyMessage);
                        copyMessage.style.display = 'flex';
                        
                        // Fade out copy message after 2 seconds
                        setTimeout(() => {
                            let fadeEffect = setInterval(function () {
                                if (!copyMessage.style.opacity) {
                                    copyMessage.style.opacity = 1;
                                }
                                if (copyMessage.style.opacity > 0) {
                                    copyMessage.style.opacity -= 0.1;
                                } else {
                                    clearInterval(fadeEffect);
                                    row.removeChild(copyMessage);
                                }
                            }, 200);
                        }, 2000);
                    });
                });

                grid.appendChild(gridItem);
            });
        });

    fetch('scripts/main-nav.json')
        .then(response => response.json())
        .then(data => {
            let nav = document.querySelector('header nav');
            data.navItems.forEach(item => {
                let link = document.createElement('a');
                link.textContent = item;
                link.href = '#';
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
                        
            let footerCopy = document.getElementById('copyright-info');
            footerCopy.textContent = data.copyInfo;

            let footerNav = document.getElementById('footer-links');
            data.footerItems.forEach(item => {
                let link = document.createElement('a');
                link.textContent = item;
                link.href = '#';
                footerNav.appendChild(link);
            });
        });
});
