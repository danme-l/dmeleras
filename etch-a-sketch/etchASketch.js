// grid 
const gridContainer = document.getElementById("gridContainer");

let colorMode = 'black';

function changeColorMode(mode){
    colorMode = mode;
}

function createGrid(rows, cols) {
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    for (let i = 0; i< (rows*cols); i++) {
        let cell = document.createElement('div');
        // cell.innerText = (i+1);
        gridContainer.appendChild(cell);
        cell.classList.add('gridBox');
        cell.addEventListener('mouseover', colorCell);
    };
};

// changes the color of the cell on the mouseover event
function colorCell(e) {
    // remove background image in case someone switches out of Owen Wilson mode
    e.target.style.backgroundImage = null;
    if (colorMode == 'black') {
        e.target.style.backgroundColor = 'rgb(0,0,0)';
    } else if (colorMode == 'rainbow') {
        // gets a random rgb value
        const redVal = Math.round(Math.random() * 255);
        const blueVal = Math.round(Math.random() * 255);
        const greenVal = Math.round(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`
    } else if (colorMode == 'eraser') {
        // eraser mode
        e.target.style.backgroundColor = 'white';
    } else if (colorMode == 'lighten') {
        // lightens by adjusting each of the rgb values up 10
        let colorString = e.target.style.backgroundColor;
        colorString = colorString.slice(4, colorString.length-1);
        let newRed = Number(colorString.replace(' ','').split(',')[0]) + 10;
        let newGreen = Number(colorString.replace(' ','').split(',')[1]) + 10;
        let newBlue = Number(colorString.replace(' ','').split(',')[2]) + 10;
        e.target.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
    } else if (colorMode == 'darken') {
        // background color is empty by default
        if (!e.target.style.backgroundColor) {
            e.target.style.backgroundColor = "rgb(245, 245, 245)"
        } else {
            // darkens by adjusting each of the rgb values down 10
            let colorString = e.target.style.backgroundColor;
            colorString = colorString.slice(4, colorString.length-1);
            let newRed = Number(colorString.replace(' ','').split(',')[0]) - 10;
            let newGreen = Number(colorString.replace(' ','').split(',')[1]) - 10;
            let newBlue = Number(colorString.replace(' ','').split(',')[2]) - 10;
            e.target.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
        }
    } else if (colorMode == 'owenWilson') {
        owenWilsonMode(e);
    }
}

// activate Owen Wilson
function owenWilsonMode (e) {
    // let imageNum = ;
    // let soundNum = ;
    e.target.style.backgroundImage = `url(images/ow${Math.round(Math.random() * 12)}.jpg)`;
    let soundObj = new Audio(`sounds/wow${Math.round(Math.random() * 7)}.mp3`);
    soundObj.play();
}

// grid reset
function resetGrid() {
    // get row and height inputs from boxes
    let newWidth = document.getElementById("widthConfig").value;
    let newHeight = document.getElementById("heightConfig").value;
    if (newWidth > 100 || newHeight > 100) {
        alert("Too large! Keep it under 100 cells please :)");
        return;
    }
    gridContainer.innerHTML = '';
    createGrid(newHeight, newWidth);
}

// coming back to this
// i'd like to briefly animate the outline of the 
function boxSizeTransition() {
    let gridBoxes = document.querySelectorAll(".gridBox");
    gridBoxes.forEach(box => {
        box.classList.add("gridSizeChange");
        box.addEventListener('transitionend', () => {
            box.classList.remove('gridSizeChange');
        });
    });
};

// transition end 
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('gridSizeChange');
}

window.onload = () => {
    document.getElementById('widthConfig').value = 8;
    document.getElementById('heightConfig').value = 8;
    createGrid(8,8);
}