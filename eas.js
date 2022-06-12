
function createBoard(size) {
    let drawingBoard = document.querySelector(".drawing-board");
    console.log('calls', size)
    for (let i = 1; i < size*size +1; i++) {
        if (i%size==1){
            // console.log(i)
            var rowElement = document.createElement("div");
        }
        
        let element = document.createElement("div");
        element.classList.add(`grid`, `${i}`)
        element.style.cssText = 'background-color: rgb(255, 255, 255); flex: 1; border: 1px solid darkgrey; margin:0'
        rowElement.appendChild(element);
        // console.log(i)

        if (i%size==0){
            drawingBoard.appendChild(rowElement);
            // console.log(i)
            rowElement.style.cssText = 'flex: 1; display: flex; flex-direction: row; margin: 0;'
            let hrElement = document.createElement("hr");
            hrElement.style.cssText = 'border: 0; margin: 0;'
            drawingBoard.appendChild(hrElement);
        }
    }

    drawingBoard.style.cssText = 'padding: 0; border: 1px solid black; display: flex; flex-direction: column; postion: absolute;  width: 700px; height: 700px; margin: 0px auto;'
    
}

function rand() {
    return Math.floor(Math.random() * 255);
}

function changeRandomColor(e){

    const randomColor = `rgb(${rand()}, ${rand()}, ${rand()})`

    this.style.backgroundColor = randomColor;
}

function changeColor(e) {

    if (this.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
    }

    let gridColor = this.style.backgroundColor;
    let gridColorValues = (gridColor.slice(4, -1)).split(', ').map(x=>x-25.5)
    gridColor = 'rgb('+gridColorValues.join(', ')+')'
    this.style.backgroundColor = gridColor
}

function clearBoard() {
    let clear = document.querySelector('.clear');
    var items = document.querySelectorAll(".grid");
    clear.addEventListener('click', function () {
        items.forEach(item => item.style.backgroundColor = 'rgb(255, 255, 255)');
    })
}

function sketch(boardSize, isRand) {
    createBoard(boardSize);
    let colorButton = document.querySelector('.color-button');
    var items = document.querySelectorAll(".grid");
    isRand = !isRand;
    colorButton.textContent = isRand?'Get Gradient Color':'Get Random Color';
    items.forEach(item => item.addEventListener("mouseover", isRand?changeRandomColor:changeColor, {once: isRand}));

    let clear = document.querySelector('.clear');
    clear.onclick = clearBoard();

    let newBoard = document.querySelector('.new-board');
    newBoard.onclick = function() {
        
        do {
            boardSize = prompt("Enter blocks per side (from 2 to 100)", 16);
        } while (boardSize<2|boardSize>100);

        let drawingBoard = document.querySelector(".drawing-board");

        while (drawingBoard.firstChild) {
            drawingBoard.removeChild(drawingBoard.firstChild);
        }
        
        createBoard(boardSize);
        var items = document.querySelectorAll(".grid");
        items.forEach(item => item.addEventListener("mouseover", isRand?changeRandomColor:changeColor, {once: isRand}));

    };
    
    colorButton.onclick = function () {
        clearBoard()
        let drawingBoard = document.querySelector(".drawing-board");

        while (drawingBoard.firstChild) {
            drawingBoard.removeChild(drawingBoard.firstChild);
        }
        
        sketch(boardSize, isRand);
    }

}



let boardSize = 2;
let isRand = true;



sketch(boardSize, isRand)

// clear.addEventListener('click', sketch(boardSize, isRand))
