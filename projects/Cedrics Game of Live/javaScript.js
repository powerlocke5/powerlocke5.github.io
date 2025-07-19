// Globale variables
let grid;
let tmp_arr;
let gameRunning = false;

// Info
let generationCounter = 0;
let cellBornCounter = 0;
let cellStayAliveCounter_min = 0;
let cellStayAliveCounter_max = 0
let cellDieCounter_lonliness = 0;
let cellDieCounter_overpopulation = 0;

const myInfoGC = document.getElementById("InfoGC")


//Available screen resolution
let cWidth = window.innerWidth;
let cHeight = window.innerHeight;

// width and height of each rect
let rect_px_size;

// x and y size of array
let NumOfCol;
let NumOfRow;

// set calc input
document.getElementsByName("InputCellsSize")[0].value = 5;
document.getElementsByName("InputNumCol")[0].value = Math.floor(cWidth / 100 * 75 / 5);
document.getElementsByName("InputNumRow")[0].value = Math.floor(cHeight / 100 * 75 / 5);

// variables for canvas
const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");
let canvas_size_px_w;
let canvas_size_px_h;

//Intervall
let myInterval;

//InputRange
const myInputRangeValue = document.getElementById("InputRangeValueID")
let myInputRange = document.getElementById("InputRangeID")
myInputRangeValue.textContent = myInputRange.value;

myInputRange.addEventListener("input", (event) => {
    myInputRangeValue.textContent = event.target.value;
    if (iTS.checked) {
        buttonClickStop();
        buttonClickStart()
    }

});

// Random number between 0 and 1 multiple with 'max' and rounds down
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//inputSwtich
const iTS = document.getElementById("inputToggleSwitch");
iTS.addEventListener("change", function () {
    if (this.checked) {
        buttonClickStart();
    }
    else {
        buttonClickStop();
    }

});

//Accordion
function myAccordion(id) {
    let e = document.getElementById(id);
    if (e.className.indexOf("accordionShow") == -1) {
        e.className += " accordionShow";
    } else {
        e.className = e.className.replace(" accordionShow", "")
    }
};

let tableStatistics = document.getElementById("tableStatistics");
let addRowButton = document.getElementById("AddRowTest");
let gen = 0;

function setAllCounterZero(){
    cellBornCounter = 0;
    cellStayAliveCounter_min = 0;
    cellStayAliveCounter_max = 0
    cellDieCounter_lonliness = 0;
    cellDieCounter_overpopulation = 0;
}

function addRow_table() {
    // Create a row using the inserRow() method and
    // specify the index where you want to add the row
    let row = tableStatistics.insertRow(1); // We are adding at the end

    // Create table cells
    let td1 = row.insertCell();
    let td2 = row.insertCell();
    let td3 = row.insertCell();
    let td4 = row.insertCell();
    let td5 = row.insertCell();
    let td6 = row.insertCell();
    let td7 = row.insertCell();
    let td8 = row.insertCell();
    let td9 = row.insertCell();

    // calc sum
    let SAlive = cellStayAliveCounter_min+cellStayAliveCounter_max;
    let SDied = cellDieCounter_lonliness+cellDieCounter_overpopulation;
    let SAD = (cellBornCounter + SAlive) - SDied

    // Add data to c1 and c2
    td1.innerText = generationCounter;
    td2.innerText = cellBornCounter;
    td3.innerText = SAlive;
    td4.innerText = cellStayAliveCounter_min;
    td5.innerText = cellStayAliveCounter_max;
    td6.innerText = SDied;
    td7.innerText = cellDieCounter_lonliness;
    td8.innerText = cellDieCounter_overpopulation;
    td9.innerText = SAD;

}

// main function
function setup() {

    NumOfCol = Number(document.getElementsByName("InputNumCol")[0].value);
    NumOfRow = Number(document.getElementsByName("InputNumRow")[0].value);
    rect_px_size = Number(document.getElementsByName("InputCellsSize")[0].value);

    canvas_size_px_w = (NumOfCol + 2) * rect_px_size;
    canvas_size_px_h = (NumOfRow + 2) * rect_px_size;

    canvas.setAttribute("width", String(canvas_size_px_w + "px"));
    canvas.setAttribute("height", String(canvas_size_px_h + "px"));

    grid = create2DArray(NumOfRow, NumOfCol);
    tmp_arr = create2DArray(NumOfRow, NumOfCol);

    fill2DArray_random(grid);

    copy2D_Array(grid, tmp_arr);

    draw(grid);

    //myInfoGC.textContent = generationCounter;
}

function openSide() {
    document.getElementById("SettingsContainer").style.width = "190px";
    document.getElementById("AllContent").style.marginLeft = "200px";
    document.body.style.backgroundColor = "gray";
    document.getElementById("AllContent").style.opacity = "0.1";
}

function closeSide() {
    document.getElementById("SettingsContainer").style.width = "0";
    document.getElementById("AllContent").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
    document.getElementById("AllContent").style.opacity = "1";
}

function calcRowCol() {
    rect_px_size = Number(document.getElementsByName("InputCellsSize")[0].value);
    document.getElementsByName("InputNumCol")[0].value = Math.floor(cWidth / 100 * 70 / rect_px_size);
    document.getElementsByName("InputNumRow")[0].value = Math.floor(cHeight / 100 * 70 / rect_px_size);

}

function buttonClickInit() {

    setup();

}

function startGame(TimeForInterval) {
    myInterval = setInterval(beginnLife, parseInt(TimeForInterval));
}

function buttonClickStart() {
    startGame(myInputRangeValue.value);
}

function buttonClickStop() {
    clearInterval(myInterval);
}

function beginnLife() {
    addRow_table()
    setAllCounterZero();
    rulesForCell2(grid);
    generationCounter++;

    draw(grid);
}

// create 2D array
function create2DArray(row, col) {
    let arr = new Array(row)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(col);
    }
    return arr;
}

//run through an 2D Array and fill it with random 0 or 1
function fill2DArray_random(p_2D_arr) {
    for (let i = 0; i < p_2D_arr.length; i++) {
        for (let j = 0; j < p_2D_arr[i].length; j++) {
            p_2D_arr[i][j] = getRandomInt(2);
        }
    }
}

//draw grid
function draw(p_grid) {

    let x = rect_px_size;
    let y = rect_px_size;

    for (let i = 0; i < p_grid.length; i++) {
        for (let j = 0; j < p_grid[i].length; j++) {
            if (p_grid[i][j] == 0) {
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, rect_px_size, rect_px_size);
            } else if (p_grid[i][j] == 1) {
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, rect_px_size, rect_px_size);
            }
            x += rect_px_size;
        }
        x = rect_px_size;
        y += rect_px_size;
    }
}

function returnSumOfNeighbours(p_grid, r, c) {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            let myRow = (r + i + NumOfRow) % NumOfRow;
            let myCol = (c + j + NumOfCol) % NumOfCol;
            //console.log("myCol: " + String(myCol));
            //console.log("myRow: " + String(myRow));
            //console.log("p_grid[myCol][myRow]: " + String(p_grid[myCol][myRow]))
            sum += p_grid[myRow][myCol];
        }
    }

    sum -= p_grid[r][c];

    return sum;
}

function listSumOfNeighbours(p_grid) {
    for (let i = 0; i < p_grid.length - 1; i++) {
        for (let j = 0; j < p_grid[i].length - 1; j++) {
            console.log(i + "/" + j + ": " + String(returnSumOfNeighbours(p_grid, i, j,)))
        }
    }
}

function copy2D_Array(source_arr, dest_arr) {
    for (let i = 0; i < source_arr.length; i++) {
        for (let j = 0; j < source_arr[i].length; j++) {
            dest_arr[i][j] = source_arr[i][j];
        }
    }
}

// deprecated
// rules of the Game, returned array with next generation
function rulesForCell(p_grid_pre) {

    for (let i = 0; i < p_grid_pre.length; i++) {
        for (let j = 0; j < p_grid_pre[i].length; j++) {
            let numberOfNeighbours = returnSumOfNeighbours(p_grid_pre, i, j);
            if (numberOfNeighbours < 2 || numberOfNeighbours > 3) {
                tmp_arr[i][j] = 0;
            } else if (numberOfNeighbours == 3) {
                tmp_arr[i][j] = 1;
            }

        }
    }
    copy2D_Array(tmp_arr, grid);

}

// Number of Neighbors
CellWillBeBorn = 3
CellWillBeStayAlive_min = 2
CellWillBeStayAlive_max = 3
CellWellBeDie_lonliness = 2
CellWellBeDie_overpopulation = 3

// Update rulesForCells 
// rules of the Game, returned array with next generation
function rulesForCell2(p_grid_pre) {

    for (let i = 0; i < p_grid_pre.length; i++) {
        for (let j = 0; j < p_grid_pre[i].length; j++) {
            let numberOfNeighbours = returnSumOfNeighbours(p_grid_pre, i, j);

            // Check if cell unliving
            if (p_grid_pre[i][j] == 0) {
                if (numberOfNeighbours == CellWillBeBorn) {
                    tmp_arr[i][j] = 1;
                    cellBornCounter ++;
                }
            } 
            // Check if cell living
            else if (p_grid_pre[i][j] == 1) {
                // cell will be stay alive (min)
                if (numberOfNeighbours == CellWillBeStayAlive_min) {
                    tmp_arr[i][j] = p_grid_pre[i][j];
                    cellStayAliveCounter_min ++;
                }
                // cell will be stay alive (max)
                if (numberOfNeighbours == CellWillBeStayAlive_max) {
                    tmp_arr[i][j] = p_grid_pre[i][j];
                    cellStayAliveCounter_max ++;
                }

                // cell will be die (lonliness)
                if (numberOfNeighbours < CellWellBeDie_lonliness) {
                    tmp_arr[i][j] = 0;
                    cellDieCounter_lonliness++;
                }
                // cell will be die (overpopulation)
                if (numberOfNeighbours > CellWellBeDie_overpopulation) {
                    tmp_arr[i][j] = 0;
                    cellDieCounter_overpopulation++;
                }
            }
        }


    }
    copy2D_Array(tmp_arr, grid);
}



// run 
setup();

