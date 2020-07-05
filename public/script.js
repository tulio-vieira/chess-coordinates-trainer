const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const cells = document.getElementsByClassName('cell');
const sideCheckBoxElement = document.getElementById("side-checkbox");
const currentCoordinateDisplay = document.getElementById("current-coordinate");
const quadrantSelector = document.getElementById("quadrant");
const timems = 300;


// There is a global variable called `currentCoordinate`
let currentCoordinate;

// There is a global variable for the `quadrant`
let quadrant = 0;

// There is a global variable for the side. `white = true`
let white = true;

// Each cell contains coordinate data. Run updateCellCoordinateData

initialize();


// # Initialize
function initialize() {
    updateCurrentCoordinate();
    updateCurrentCoordinateDisplay();
    updateCellCoordinateData();
}

// # HandleClick functionality
// * Put this on the event listener of the cell

for (let cell of cells) {
    cell.addEventListener("click", handleCellClick);
}

function handleCellClick(event) {
    let cell = event.target;
    let cellCoordinate = cell.getAttribute('data-coordinate');
    
    cell.innerText = cellCoordinate;

    // When a cell is clicked, its coordinate data is compared to the currentCoordinate
    if (cellCoordinate === currentCoordinate) {
        // if they are the same, you change the currentCoordinate display to green, by adding the `correct` class
        currentCoordinateDisplay.classList.remove('wrong');
        currentCoordinateDisplay.classList.add('correct');
    } else {
        // if not, you change the class to `wrong`
        currentCoordinateDisplay.classList.add('wrong');
    }

    // After some fractions of second
    setTimeout(function(){
        cell.innerText = null;
        if (cellCoordinate !== currentCoordinate) return;

        // Call random Coordinate
        updateCurrentCoordinate();

        // Call updateCurrentCoordinateDisplay
        updateCurrentCoordinateDisplay();
    }, timems);
}


// # Switch sides
// * Put this on the event listener of the switch

sideCheckBoxElement.addEventListener("click", function(){
    // Updates `white` variable.
    white = !this.checked;
    
    // Call `updateCellCoordinateData`.
    updateCellCoordinateData();

    // Call `Switch Quadrant display`.
    switchQuadrantDisplay();
});


// # Switch Quadrant
// * Put this on the event listener of the quadrant selector

quadrantSelector.addEventListener("change", function(){
    // Change global `quadrant` variable according to user's input.
    quadrant = Number(this.value);

    // Call `Random Coordinate`. This step is necessary to avoid the current coordinate to be out of the selected quadrant.
    updateCurrentCoordinate();

    updateCurrentCoordinateDisplay();

    // Call `Switch Quadrant display`.
    switchQuadrantDisplay();
});




// # updateCurrentCoordinateDisplay

function updateCurrentCoordinateDisplay(){
    // update text content with currentCoordinate variable
    currentCoordinateDisplay.innerText = currentCoordinate;

    // remove `wrong` and `correct` classes
    currentCoordinateDisplay.classList.remove("wrong", "correct");
}


// # updateCellCoordinateData

// Updates the coordinate data of the cells depending on `white` variable.
function updateCellCoordinateData(){
    let letter;
    let number;
    for (let i = 0; i < cells.length; i++) {
        let [x, y] = transformCoordinates(i , 8);
        if (white) {
            letter = letters[y];
            number = 7 - x + 1;
        } else {
            letter = letters[7 - y];
            number = x + 1;
        }
        cells[i].setAttribute("data-coordinate", letter + number);
    }
}

function transformCoordinates(index, gridSide) {
    let x = Math.floor(index / gridSide);
    let y = index - x * gridSide;
    return [x, y];
}



// # Random Coordinate

// Updates `currentCoordinate` depending on the global `quadrant` variable.
function updateCurrentCoordinate(){
    let letter;
    let number;
    if(quadrant === 0) {
        let [x, y] = randomCoordinate(8);
        letter = letters[y];
        number = x + 1;
    } else {
        let [x, y] = randomCoordinate(4);
        if (quadrant === 1 || quadrant === 4) {
            letter = letters[y];
        } else {
            letter = letters[y + 4];
        }
        
        if(quadrant === 1 || quadrant === 2) {
            number = x + 1;
        } else {
            number = x + 5;
        }
    }
    currentCoordinate = letter + number;
}

function randomCoordinate(side) {
    return [randomNumber(side), randomNumber(side)];
}

function randomNumber(number){
    return Math.floor(Math.random()*number);
}


// # Switch Quadrant display

// Changes the display of the board according to `quadrant` and `white`.
function switchQuadrantDisplay(){
    resetBoard();
    if (quadrant === 0) return;
    for(let x = 0; x < 8; x++){
        for(let y = 0; y < 8; y++){
            if(!isCellInQuadrant(x, y)) {
                let i = transformReverse(x, y, 8);
                cells[i].classList.add('disabled');
            }
        }
    }
}

function resetBoard(){
    for (let cell of cells) {
        cell.classList.remove("disabled");
    }
}

function transformReverse(x, y, gridSide) {
    return x * gridSide + y;
}

function isCellInQuadrant(x, y){
    let quadrantVariable = quadrant;
    if (!white) {
        quadrantVariable = quadrant + 2;
        if (quadrantVariable > 4) quadrantVariable = quadrantVariable % 4;
    }
    switch (quadrantVariable) {
        case 1:
            if (x >= 4 && y < 4) return true;
            return false;
        case 2:
            if (x >= 4 && y >= 4) return true;
            return false;
        case 3:
            if (x < 4 && y >= 4) return true;
            return false;
        case 4:
            if (x < 4 && y < 4) return true;
            return false;
    }
}



// this function is not used, because the html already marks the dark squares
function makeCheckerBoard(gridSide){
    for(let x = 0; x < gridSide; x++){
        for(let y = 0; y < gridSide; y++){
            if((x + y) % 2) {
                let i = transformReverse(x, y, gridSide);
                cells[i].classList.add("dark");
            }
        }
    }
}