import { customAlphabet } from 'nanoid';
import figures from '../figures.js';

const nanoid = customAlphabet('1234567890', 20);

function createCell(color, x, y) {
    const newCell = {
        id: nanoid(),
        color: color,
        isAvailable: false,
        x: x,
        y: y,
        figure: null,
    }
    return newCell;
}

const createBoard = () => {
    let arr = [];
    for (let i = 1; i <= 8; i++) {
      const row = [];
      for (let j = 1; j <= 8; j++) {
        if((i + j) % 2 !== 0) {
          row.push(createCell('black', j, i));
        } else {
          row.push(createCell('white', j, i));
        }
      }
      arr.push(...row);
    }
    let boardWithFigures = arr.map(el => {
      if(el.y === 1){
        if(el.x === 1 || el.x === 8) {
          return {...el, figure: figures.rook_white}
        }   
        if(el.x === 2 || el.x === 7) {
          return {...el, figure: figures.knight_white}
        }
        if(el.x === 3 || el.x === 6) {
          return {...el, figure: figures.pawn_white}
        }
        if(el.x === 4) {
          return {...el, figure: figures.king_white}
        }
        if(el.x === 5) {
          return {...el, figure: figures.queen_white}
        }
      }
      if(el.y === 2 && (1 <= el.x <= 8)){        
        return {...el, figure: figures.bishop_white}
      } 
      if(el.y === 8){
        if(el.x === 1 || el.x === 8) {
          return {...el, figure: figures.rook_black}
        }   
        if(el.x === 2 || el.x === 7) {
          return {...el, figure: figures.knight_black}
        }
        if(el.x === 3 || el.x === 6) {
          return {...el, figure: figures.pawn_black}
        }
        if(el.x === 4) {
          return {...el, figure: figures.king_black}
        }
        if(el.x === 5) {
          return {...el, figure: figures.queen_black}
        }
      }
      if(el.y === 7 && (1 <= el.x <= 8)) {
        return {...el, figure: figures.bishop_black}
      }
      return {...el, figure: null};
    });
    return boardWithFigures;
}

export { createBoard };
