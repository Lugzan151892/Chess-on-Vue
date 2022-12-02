function getCell(currentBoard, x, y) {
    let arr = currentBoard.filter(el => el.x === x);
    let result = arr.filter(el => el.y === y);
    return result[0];
}

// Three functions, to check cells with figures:
function isEmptyVertical(currentBoard, item, cell) {
    if (cell.x !== item.x) return false;
    const min = Math.min(item.y, cell.y);
    const max = Math.max(item.y, cell.y);
    for (let y = min + 1; y < max; y++) {      
      if(getCell(currentBoard, item.x, y).figure) {
        return false;
      }
    }
    return true;
  }

function isEmptyHorizontal(currentBoard, item, cell) {    
    if (cell.y !== item.y) return false;
    const min = Math.min(item.x, cell.x);
    const max = Math.max(item.x, cell.x);
    for (let x = min + 1; x < max; x++) {      
      if(getCell(currentBoard, x, item.y).figure) {
        return false;
      }
    }
    return true;
  }
  
function isEmptyDiagonal(currentBoard, item, cell) {
    const xDifferent = Math.abs(cell.x - item.x);
    const yDifferent = Math.abs(cell.y - item.y);
    if(yDifferent !== xDifferent) return false;

    const yDistance = (item.y < cell.y) ? 1 : -1;
    const xDistance = (item.x < cell.x) ? 1 : -1;

    for (let i = 1; i < yDifferent; i++) {
      let x = item.x + xDistance * i;
      let y = item.y + yDistance * i;
      if(getCell(currentBoard, x, y).figure) return false;
    }
    return true;
}

function canBishopMove(currentBoard, item, cell) {
    if(item.figure.color === 'white') { 
        if(item.y === 2 && cell.y <= 4 && cell.y > item.y){
            if(!cell.figure && item.x === cell.x) {
                if(!isEmptyVertical(currentBoard, item, cell)) return false;
                return true;
            }
            if(item.y === cell.y - 1){
                if((cell.figure && item.x === cell.x - 1) || (cell.figure && item.x === cell.x + 1)) return true;
                return false;
            }
            return false;
        }
        if(item.y !== 2 && cell.y === (item.y + 1) && cell.y > item.y) {
            if(!cell.figure && item.x === cell.x || cell.figure && item.x === cell.x - 1 || cell.figure && item.x === cell.x + 1) return true;
            return false;
        }
        return false;
    }
    if(item.figure.color === 'black') {        
        if(item.y === 7 && cell.y >= 5 && cell.y < item.y){
            if(!cell.figure && item.x === cell.x) {
                if(!isEmptyVertical(currentBoard, item, cell)) return false;
                return true;
            }
            if(item.y === cell.y + 1) {
                if(cell.figure && item.x === cell.x - 1 || cell.figure && item.x === cell.x + 1) return true;
                return false;
            }
            return false; 
        }
        if(item.y !== 7 && cell.y === (item.y - 1) && cell.y < item.y) {
            if(!cell.figure && item.x === cell.x || cell.figure && item.x === cell.x - 1 || cell.figure && item.x === cell.x + 1) return true;
            return false;
        }
        return false;
    }
}

function canKnightMove(item, cell) {
    const xDistance = Math.abs(item.x - cell.x);
    const yDistance = Math.abs(item.y - cell.y);
    if(xDistance === 1 && yDistance === 2) return true;
    if(xDistance === 2 && yDistance === 1) return true;
    return false;
}

function canRookMove(currentBoard, item, cell) {
    if(isEmptyVertical(currentBoard, item, cell)) return true;
    if(isEmptyHorizontal(currentBoard, item, cell)) return true;
    return false;
}

function canPawnMove(currentBoard, item, cell) {
    if(isEmptyDiagonal(currentBoard, item, cell)) return true;
    return false;
}

function canQueenMove(currentBoard, item, cell) {
    if(isEmptyVertical(currentBoard, item, cell)) return true;
    if(isEmptyHorizontal(currentBoard, item, cell)) return true;
    if(isEmptyDiagonal(currentBoard, item, cell)) return true;
    return false;
}

function canKingMove(item, cell) {
    const xDifferent = Math.abs(item.x - cell.x);
    const yDifferent = Math.abs(item.y - cell.y);
    if(xDifferent < 2 && yDifferent < 2) return true;
    return false;
}

export { canRookMove, canPawnMove, canQueenMove, canKingMove, canBishopMove, canKnightMove };
