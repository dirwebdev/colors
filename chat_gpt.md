# Chatgpt 4.0 Prompt Used

```txt
Create a semantic/responsive .html .css .js .json page:

File/Folder Structure will be as follows:

- root
index.html
styles
styles/styles.css
scripts
scripts/scripts.js
scripts/colors-hex.json
scripts/main-nav.json
scripts/footer.json

basic css reset for * should include:
margin 0
padding 0
box sizing; border box

main content needs to be a grid, max 8 columns

the grid will consist of a square split in 3 rows,

top row 50px
second row 25px
third row 25px

so each grid item is essentially 150px wide, 100px tall

the grid item a random hex code
the grid item will have an id that is the said hex code
the grid item top row will have 
    - background color of said hex code
    - border black
the grid item second row will diplay the hex code
the grid item third row will contain the hex code actual color
    - background color black
    - text white

the content needs to be in colors-hex.json file, and injected safely into the .html

example .json:

id #123456
name Deep-Sea Blue

generate sample header and footer .json files and they need to be injected to each page safely
```


## File structure used

```bash
mkdir styles scripts && touch index.html styles/styles.css scripts/scripts.js scripts/colors-hex.json scripts/main-nav.json scripts/footer.json
```