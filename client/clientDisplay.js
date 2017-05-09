// clientDisplay

const ctx = getCanvasAndContext();

function getCanvasAndContext() {

    let canvasElements = document.getElementsByTagName("canvas");
    return canvasElements[0].getContext("2d");
}

function displaySquares(numberOfSquares) {

    let x = 100;
    let y = 0;
    let width = 10;
    let height = 10;

    for (let i = 0; i < numberOfSquares; i++, y += 20) {

        drawRectangle("black", 1, x, y, width, height);
    }
}

function displayFilledSquare(squareNumber) {

    let x = 100;
    let y = 0;
    let width = 10;
    let height = 10;

    for (let i = 0; i < squareNumber; i++) {

        y += 20;
    }

    fillRectangle("black", x, y, width, height);
}

function displayText(text) {

    let spanElements = document.getElementsByTagName("span");
    spanElements[0].textContent = text;
}

function drawRectangle(lineColor, lineWidth, x, y, width, height) {

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
}

function fillRectangle(fillColor, x, y, width, height) {

    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
}


