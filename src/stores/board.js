import { ref } from 'vue'
import { defineStore } from 'pinia';
import { canBishopMove, canKnightMove, canRookMove, canPawnMove, canQueenMove, canKingMove } from '../utils/functions/moveFiguresFunctions.js';
import { createBoard } from '../utils/functions/board.js';

export const useBoardStore = defineStore('board', () => {
  const startingBoard = ref([]);

  //Current rendered board
  const board = ref([]);

  //Array of all turns in the game
  const boardState = ref([]);

  const killedFigures = ref([]);
  const deadFigures = ref([]);
  const currentFigure = ref(null);
  const isWhiteTurn = ref(true);
  const isAlert = ref(false);
  const currentTurn = ref(0);
  const isRotate = ref(false);

  // Overwrite board state
  function updateBoard(newBoard) {
    board.value = newBoard;
  }

  // Get default board with figures
  function getStartingState() {
    startingBoard.value = createBoard();
    boardState.value = [createBoard()];
  }

  function restartGame() {
    boardState.value = [startingBoard.value];
    currentTurn.value = 0;
    killedFigures.value = [];
    isWhiteTurn.value = true;
    updateBoard(boardState.value[currentTurn.value]);
  }

  function rotateBoard() {
    isRotate.value = !isRotate.value;
  }

  function nextStep(){
    if(currentTurn.value === boardState.value.length - 1) return;
    currentTurn.value = currentTurn.value + 1;
    isWhiteTurn.value = !isWhiteTurn.value
    updateBoard(boardState.value[currentTurn.value]);
    hideDeadFigures();
    console.log(killedFigures.value);
  }

  function previousStep(){
    if(currentTurn.value === 0) return;
    currentTurn.value = currentTurn.value - 1;
    isWhiteTurn.value = !isWhiteTurn.value;
    // checkKilledFigures();
    updateBoard(boardState.value[currentTurn.value]);
    hideDeadFigures();
    console.log(killedFigures.value);
  }

  //This function is needed to render board after turn, without highlights
  function saveBoard(item) {
    let arr = boardState.value[currentTurn.value].map(el => {
      if (item.id === el.id) {
        return {...el, figure: currentFigure.value.figure}
      }
      if(el.id === currentFigure.value.id) {
        return {...el, figure: null}
      }
      return el;
    });    
    boardState.value = [...boardState.value, arr];
    updateBoard(boardState.value[currentTurn.value]);    
  }
  
  // This function is needed to update state after we went on turn before and wanna continue the game not from the last move
  function getNewState() {
    boardState.value = boardState.value.slice(0, currentTurn.value + 1);
  }

  function checkAvailableTurns(item) {
    let highlightTurns = board.value.map((el)=> {
      if(el.figure && el.figure.color === item.figure.color) return el;
      if(item.figure.name === 'bishop') {
        if(canBishopMove(item, el)) return {...el, isAvailable: true};
        return el;
      }
      if(item.figure.name === 'knight') {
        if(canKnightMove(item, el)) return {...el, isAvailable: true};
        return el;
      }
      if(item.figure.name === 'rook') {
        if(canRookMove(board.value, item, el)) return {...el, isAvailable: true};
        return el;
      }
      if(item.figure.name === 'pawn') {      
        if(canPawnMove(board.value, item, el)) return {...el, isAvailable: true};
        return el;
      }
      if(item.figure.name === 'queen') {
        if(canQueenMove(board.value, item, el)) return {...el, isAvailable: true};
        return el;
      }
      if(item.figure.name === 'king') {
        if(canKingMove(item, el)) return {...el, isAvailable: true};
        return el;
      }
      return el;
    });   
    board.value = highlightTurns;
  }

  //Show alert modal if it's not your turn now, hide it after 1s;
  function triggerAlert() {
    currentFigure.value = null;
    isAlert.value = true;
    setTimeout(function(){
      isAlert.value = false
    }, 1000);
  }

  function hideDeadFigures() {
    let changedDeadFigures = deadFigures.value.map(el => {
      if(el.turnNumber < currentTurn.value) {
        return {...el, isVisible: true}
      } else {
        return {...el, isVisible: false}
      }
    });
    killedFigures.value = changedDeadFigures.filter(el => el.isVisible);
    deadFigures.value = changedDeadFigures;
  }

  function checkKilledFigures() {
    let finalDeadFigures = deadFigures.value.filter(el => el.isVisible);
    killedFigures.value = finalDeadFigures;
    deadFigures.value = finalDeadFigures;
  }

  function startDrag(event, item){
    if(item.figure.color === 'white' && !isWhiteTurn.value){
      triggerAlert();
      return;
    }
    if(item.figure.color === 'black' && isWhiteTurn.value){
      triggerAlert();
      return;
    }
    currentFigure.value = item;
    checkAvailableTurns(item);
  }

  function onDrop(event, item) {
    if(currentFigure.value === null) return;
    if(item.isAvailable === false) {
      updateBoard(boardState.value[currentTurn.value]);
      return;
    }
    if(currentFigure.value.id === item.id) {
      updateBoard(boardState.value[currentTurn.value]);
      return;
    }
    if(item.figure) {
      killedFigures.value = [...killedFigures.value, {...item.figure, turnNumber: currentTurn.value, isVisible: true}];
      deadFigures.value = killedFigures.value;
      console.log(killedFigures.value);
    }
    if(boardState.value.length !== currentTurn.value + 1) {
      getNewState();
      checkKilledFigures();
    }
    saveBoard(item);
    currentTurn.value = currentTurn.value + 1;
    updateBoard(boardState.value[currentTurn.value]);
    currentFigure.value = null;
    isWhiteTurn.value = !isWhiteTurn.value;
  }

  return { board, deadFigures, getStartingState, currentTurn, boardState, restartGame, startDrag, onDrop, previousStep, nextStep, isWhiteTurn, isAlert, killedFigures, updateBoard, isRotate, rotateBoard }
});
